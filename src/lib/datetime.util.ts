export function convertDateString(isoDateString:string):string {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  return formattedDate;
}

