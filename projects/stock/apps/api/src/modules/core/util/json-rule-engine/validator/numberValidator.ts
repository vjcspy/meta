export function numberValidator(factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN';
}
