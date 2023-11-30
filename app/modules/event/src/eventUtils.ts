const moment = require('moment');

export function formatDateString(inputDate:string) {
  const originalDate = moment(inputDate);
  return originalDate.format('DD MMMM, YYYY');
}
