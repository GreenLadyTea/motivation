export function setDate(date) {
  const dateNew = new Date(date);
  return dateNew.toLocaleString().slice(0, 17);
}
