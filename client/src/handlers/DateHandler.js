export function setDate(date) {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleString().slice(0, 17);
}
