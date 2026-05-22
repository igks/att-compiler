
export function formatDate(input) {
  const [date, time] = input.split(" ");
  const [year, month, day] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day}-${months[Number(month) - 1]}-${year}`;
}

export function extractTempo(rows) {
  const data = rows.map(row =>({
    date: formatDate(row['Work date']),
    hour: row['Logged Hours'],
    workItem: row['Work Item Key'] + ": " + row['Work Item summary'] + " - " + row['Work Description']
  }));
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function decimalToHHmm(decimalHours) {
  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}