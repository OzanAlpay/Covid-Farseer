export default iso8601DayString => {
  let date = new Date(iso8601DayString);
  return date.toLocaleDateString("tr-Tr");
};
