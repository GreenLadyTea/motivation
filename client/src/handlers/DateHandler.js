export function setDate(date) {
  const string = date.slice(0, 16);
  const right = new Date(string);
  return right.toLocaleString().slice(0, 17);
}
