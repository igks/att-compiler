import { Config } from "./config.js";
import { writeCsv } from "./csv-writer.js";

export async function createDsErpReport(data, period) {
  const columns = [
    { header: "Project Name", key: "project" },
    { header: "Task", key: "task" },
    { header: "Date", key: "date" },
    { header: "Hours", key: "hour" }
  ];

  const rows = data.map(row => ({
    project: Config.client,
    task: row.workItem,
    date: row.dateOrg,
    hour: Number(row.hour),
  }));

  const timestamp = Date.now();
  await writeCsv(`${Config.directory}/gusti-ds-erp-${period}-${timestamp}.csv`, columns, rows);
}
