export const readableDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
  );
};

export const formatDate = (date)=> {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const getFieldName = (formName) => {
  if(formName){
    let splitValues = formName.split('_')
    const capitalizedStr = splitValues[0].charAt(0).toUpperCase() + splitValues[0].substr(1, splitValues.substr);
    splitValues[0] = capitalizedStr;
    return splitValues.join(' ');
  }
}
