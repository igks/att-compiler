import { writeFile } from "fs/promises";

function escapeCell(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

// columns: [{ header, key }], rows: [{ [key]: value }]
export async function writeCsv(filePath, columns, rows) {
  const lines = [columns.map(c => escapeCell(c.header)).join(",")];
  for (const row of rows) {
    lines.push(columns.map(c => escapeCell(row[c.key])).join(","));
  }
  await writeFile(filePath, lines.join("\r\n") + "\r\n", "utf8");
}
