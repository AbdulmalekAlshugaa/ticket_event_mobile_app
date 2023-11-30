const moment = require('moment');

export function formatDateString(inputDate:string, format:string) {
  const originalDate = moment(inputDate);
  return originalDate.format(format);
}
