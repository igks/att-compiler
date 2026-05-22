import fs from "fs";
import csv from "csv-parser";
import { createWeeklyReport } from "./weely-report.js";
import { createZohoReport } from "./zoho-report.js";
import { Config } from "./config.js";

const results = [];
const filePath = `${Config.directory}${Config.filename}`;
const skipLines = Config.filename === 'tempo.csv' ? 0 : 2;

fs.createReadStream(filePath)
  .pipe(csv({skipLines: skipLines}))
  .on("data", (data) => {
    data.Time = parseFloat(data.Time);
    results.push(data);
  })
  .on("end", async () => {
    results.pop();
    console.log("CSV loaded:", results.length, "rows");
    const yyyymmdd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const sortedResults = results.sort((a, b) => new Date(a.Day) - new Date(b.Day));

    await createWeeklyReport(sortedResults, yyyymmdd);
    // await createZohoReport(sortedResults, yyyymmdd);

    console.log("Excel files generated 🎉");
  });

