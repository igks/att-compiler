
export function formatDate(input) {
  const [year, month, day] = input.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day}-${months[Number(month) - 1]}-${year}`;
}

export function extractDetails(row) {
  const [task, ticket] = row.Task.split(" #");
  const comment = row.Comments ? `- ${row.Comments}` : "";
  return ticket ? `[${ticket}]: ${task} ${comment}` : `${task} ${comment}`;
}

export function decimalToHHmm(decimalHours) {
  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}