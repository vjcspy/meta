#!/usr/bin/env bash
set -euo pipefail

REMOTE="postgresql://root:root@54.251.229.80:32261/meta"
LOCAL_CONTAINER="meta-stock-postgres"
LOCAL_DB="meta"

remote_psql() {
  docker run --rm postgres:18 psql "$REMOTE" "$@"
}

local_psql() {
  docker exec "$LOCAL_CONTAINER" psql -U root -d "$LOCAL_DB" "$@"
}

remote_copy_stdout() {
  docker run --rm postgres:18 psql "$REMOTE" -c "\\copy ($1) TO STDOUT"
}

local_copy_stdin() {
  docker exec -i "$LOCAL_CONTAINER" psql -U root -d "$LOCAL_DB" -c "\\copy $1 FROM STDIN"
}

echo "=== Stock Data Sync from Server ==="
echo "Started at $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# --- stock_info_ticks: ID-based delta (append-only) ---
echo "--- stock_info_ticks (id-based delta) ---"
MAX_TICK_ID=$(local_psql -tA -c "SELECT COALESCE(MAX(id), 0) FROM stock_info_ticks;")
echo "  Local max(id): $MAX_TICK_ID"

TICK_COUNT=$(remote_psql -tA -c "SELECT count(*) FROM stock_info_ticks WHERE id > $MAX_TICK_ID;")
echo "  Remote new rows: $TICK_COUNT"

if [ "$TICK_COUNT" -gt 0 ]; then
  TICK_QUERY="SELECT * FROM stock_info_ticks WHERE id > $MAX_TICK_ID ORDER BY id"
  remote_copy_stdout "$TICK_QUERY" | local_copy_stdin "stock_info_ticks"
  NEW_MAX=$(local_psql -tA -c "SELECT MAX(id) FROM stock_info_ticks;")
  echo "  Synced $TICK_COUNT rows (id $MAX_TICK_ID -> $NEW_MAX)"
else
  echo "  Nothing to sync"
fi
echo ""

# --- stock_info_prices: date-based delta + upsert ---
echo "--- stock_info_prices (date-based upsert) ---"
MAX_PRICE_DATE=$(local_psql -tA -c "SELECT COALESCE(MAX(date)::text, '1970-01-01') FROM stock_info_prices;")
echo "  Local max(date): $MAX_PRICE_DATE"

PRICE_COUNT=$(remote_psql -tA -c "SELECT count(*) FROM stock_info_prices WHERE date >= '$MAX_PRICE_DATE';")
echo "  Remote rows (>= $MAX_PRICE_DATE): $PRICE_COUNT"

if [ "$PRICE_COUNT" -gt 0 ]; then
  PRICE_QUERY="SELECT * FROM stock_info_prices WHERE date >= '$MAX_PRICE_DATE' ORDER BY id"

  local_psql -c "DROP TABLE IF EXISTS _prices_staging; CREATE TABLE _prices_staging (LIKE stock_info_prices INCLUDING ALL);"
  remote_copy_stdout "$PRICE_QUERY" | local_copy_stdin "_prices_staging"

  UPSERTED=$(local_psql -tA -c "
    WITH upsert AS (
      INSERT INTO stock_info_prices
      SELECT * FROM _prices_staging
      ON CONFLICT (symbol, date) DO UPDATE SET
        \"priceBasic\" = EXCLUDED.\"priceBasic\",
        \"priceHigh\" = EXCLUDED.\"priceHigh\",
        \"priceLow\" = EXCLUDED.\"priceLow\",
        \"priceOpen\" = EXCLUDED.\"priceOpen\",
        \"priceClose\" = EXCLUDED.\"priceClose\",
        \"priceAverage\" = EXCLUDED.\"priceAverage\",
        volume = EXCLUDED.volume,
        value = EXCLUDED.value,
        \"dealVolume\" = EXCLUDED.\"dealVolume\",
        \"buyForeignQuantity\" = EXCLUDED.\"buyForeignQuantity\",
        \"buyForeignValue\" = EXCLUDED.\"buyForeignValue\",
        \"sellForeignQuantity\" = EXCLUDED.\"sellForeignQuantity\",
        \"sellForeignValue\" = EXCLUDED.\"sellForeignValue\",
        \"currentForeignRoom\" = EXCLUDED.\"currentForeignRoom\"
      RETURNING 1
    ) SELECT count(*) FROM upsert;
  ")
  echo "  Upserted $UPSERTED rows"
  local_psql -c "DROP TABLE IF EXISTS _prices_staging;"
else
  echo "  Nothing to sync"
fi
echo ""

# --- stock_info_stocks: full refresh ---
echo "--- stock_info_stocks (full refresh) ---"
STOCKS_COUNT=$(remote_psql -tA -c "SELECT count(*) FROM stock_info_stocks;")
echo "  Remote rows: $STOCKS_COUNT"

local_psql -c "TRUNCATE stock_info_stocks RESTART IDENTITY CASCADE;"
STOCKS_QUERY="SELECT * FROM stock_info_stocks ORDER BY id"
remote_copy_stdout "$STOCKS_QUERY" | local_copy_stdin "stock_info_stocks"

LOCAL_STOCKS=$(local_psql -tA -c "SELECT count(*) FROM stock_info_stocks;")
echo "  Synced $LOCAL_STOCKS rows"
echo ""

# --- stock_common_configuration: key-based upsert ---
echo "--- stock_common_configuration (key-based upsert) ---"
CONFIG_COUNT=$(remote_psql -tA -c "SELECT count(*) FROM stock_common_configuration;")
echo "  Remote rows: $CONFIG_COUNT"

local_psql -c "DROP TABLE IF EXISTS _config_staging; CREATE TABLE _config_staging (LIKE stock_common_configuration INCLUDING ALL);"
CONFIG_QUERY="SELECT * FROM stock_common_configuration ORDER BY id"
remote_copy_stdout "$CONFIG_QUERY" | local_copy_stdin "_config_staging"

UPSERTED=$(local_psql -tA -c "
  WITH upsert AS (
    INSERT INTO stock_common_configuration (id, key, value, created_at, updated_at)
    SELECT id, key, value, created_at, updated_at FROM _config_staging
    ON CONFLICT (key) DO UPDATE SET
      value = EXCLUDED.value,
      updated_at = EXCLUDED.updated_at
    RETURNING 1
  ) SELECT count(*) FROM upsert;
")
echo "  Upserted $UPSERTED rows (local-only keys preserved)"
local_psql -c "DROP TABLE IF EXISTS _config_staging;"
echo ""

# --- Sequence fix: ensure sequences are ahead of max IDs ---
echo "--- Fixing sequences ---"
for tbl in stock_info_ticks stock_info_prices stock_info_stocks stock_common_configuration; do
  SEQ="${tbl}_id_seq"
  MAX_ID=$(local_psql -tA -c "SELECT COALESCE(MAX(id), 0) FROM $tbl;")
  local_psql -c "SELECT setval('${SEQ}', GREATEST($MAX_ID, 1));" > /dev/null
  echo "  $SEQ -> $MAX_ID"
done
echo ""

echo "=== Sync complete at $(date -u '+%Y-%m-%d %H:%M:%S UTC') ==="
