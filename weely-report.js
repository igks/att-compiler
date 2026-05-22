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
    sheet.addRow({date: row.date, item: row.workItem, hour: Number(row.hour)});
  }
  const timestamp = Date.now();
  await workbook.xlsx.writeFile(`${Config.directory}/gusti-wr-${period}-${timestamp}.xlsx`);
}