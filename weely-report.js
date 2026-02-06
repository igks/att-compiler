import { extractDetails, formatDate } from "./utils.js";
import ExcelJS from "exceljs";
import { Config } from "./config.js";

export async function createWeeklyReport(data, period) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`wr-${period}`);

  sheet.columns = [
    { header: "Date", key: "date" },
    { header: "Work Item", key: "item" },
    { header: "Hour(s)", key: "hour" }
  ];

  for(let row of data) {
    const detail = extractDetails(row);
    sheet.addRow({date: formatDate(row.Day), item: detail, hour: row.Time});
  }
  const timestamp = Date.now();
  await workbook.xlsx.writeFile(`${Config.directory}gusti-wr-${period}-${timestamp}.xlsx`);
}