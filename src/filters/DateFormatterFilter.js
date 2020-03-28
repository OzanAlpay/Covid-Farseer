export default dayData => {
  console.log("DateFormatterFilter called!");
  return dayData.map(data => {
    let date = new Date(data.Date);
    return date.toLocaleDateString("tr-Tr");
  });
};
