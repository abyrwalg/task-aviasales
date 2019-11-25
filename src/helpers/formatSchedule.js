function formatSchedule(date, duration) {

  let dateObject = new Date(date);
  const start = `${(dateObject.getHours() < 10 ? '0' : '') + dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()}`;

  dateObject = new Date(dateObject.getTime() + duration * 60000);
  const end = `${(dateObject.getHours() < 10 ? '0' : '') + dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()}`;

  return [start, end];

}

export default formatSchedule;