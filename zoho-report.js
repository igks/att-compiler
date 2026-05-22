import { Config } from "./config.js";
import ExcelJS from "exceljs";
import { decimalToHHmm } from "./utils.js";

export async function createZohoReport(data, period) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`zr-${period}`);
  								
  sheet.columns = [
    { header: "Project Name", key: "project" },
    { header: "Job Name", key: "job" },
    { header: "Work Item", key: "item" },
    { header: "Mail Id", key: "mail" },
    { header: "Employee ID", key: "employee" },
    { header: "Date", key: "date" },
    { header: "From time", key: "fromTime" },
    { header: "To time", key: "toTime" },
    { header: "Hours", key: "hour" },
    { header: "Description (Leave it empty)", key: "description" }
  ];

  for(let row of data) {
    sheet.addRow({
      project: Config.client,
      job: Config.client,
      item: row.workItem,
      mail: Config.email,
      employee: Config.empId,
      date: row.date,
      fromTime: '',
      toTime: '',
      hour: decimalToHHmm(row.hour),
      description: row.workItem
    });
  }
  const timestamp = Date.now();
  await workbook.xlsx.writeFile(`${Config.directory}/gusti-zr-${period}-${timestamp}.xlsx`);
}