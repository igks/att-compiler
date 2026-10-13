import { Config } from "./config.js";
import { writeCsv } from "./csv-writer.js";

export async function createWeeklyReport(data, period) {
  const columns = [
    { header: "Date", key: "date" },
    { header: "Work Item", key: "item" },
    { header: "Hour(s)", key: "hour" }
  ];

  const rows = data.map(row => ({ date: row.date, item: row.workItem, hour: Number(row.hour) }));

  const timestamp = Date.now();
  await writeCsv(`${Config.directory}/gusti-wr-${period}-${timestamp}.csv`, columns, rows);
}
