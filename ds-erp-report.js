import { Config } from "./config.js";
import ExcelJS from "exceljs";
import { decimalToHHmm } from "./utils.js";

export async function createDsErpReport(data, period) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`ds-erp-${period}`);
  								
  sheet.columns = [
    { header: "Project Name", key: "project" },
    { header: "Task", key: "task" },
    { header: "Date", key: "date" },
    { header: "Hours", key: "hour" }
  ];

  for(let row of data) {
    sheet.addRow({
      project: Config.client,
      task: row.workItem,
      date: row.dateOrg,
      hour: decimalToHHmm(row.hour),
    });
  }
  const timestamp = Date.now();
  await workbook.csv.writeFile(`${Config.directory}/gusti-ds-erp-${period}-${timestamp}.csv`);
}