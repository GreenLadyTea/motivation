export function setDate(date) {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleString().slice(0, 17);
}

export function countDifferenceInDays(term) {
  const dateFormatTerm = new Date(term);
  const dateFormatNow = new Date();
  const timeDiff = Math.abs(dateFormatTerm.getTime() - dateFormatNow.getTime());
  const threeDays = 3 * 1000 * 3600 * 24;
  return timeDiff < threeDays;
}
