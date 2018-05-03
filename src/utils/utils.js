export function zeroFull(str) {
  return str >= 10 ? str : `0${str}`;
}

export function getMonthCount(year, month) {
  const d = new Date(year, month, 0);
  return d.getDate();
}
