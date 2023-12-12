export function getKeyByValue(object, value) {
  const entry = Object.entries(object).find(([key, val]) => val === value);
  return entry ? entry[0] : null;
}