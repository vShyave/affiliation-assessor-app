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
