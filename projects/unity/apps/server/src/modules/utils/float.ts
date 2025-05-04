export function roundFloat(value: number, decimals: number = 3): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
