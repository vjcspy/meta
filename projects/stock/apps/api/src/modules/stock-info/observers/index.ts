import { CorEffects } from '@modules/stock-info/observers/cor/cor.effects';
import { OmEffects } from '@modules/stock-info/observers/order-matching/om.effects';
import { StockPriceEffects } from '@modules/stock-info/observers/stock-price/stock-price.effects';

export const OBSERVER_SERVICES = [CorEffects, OmEffects, StockPriceEffects];
