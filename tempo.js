import fs from "fs";
import csv from "csv-parser";
import { createWeeklyReport } from "./weely-report.js";
import { createZohoReport } from "./zoho-report.js";
import { Config } from "./config.js";
import { extractTempo } from "./utils.js";

const results = [];
const filePath = `${Config.directory}/${Config.filename}`;
const skipLines = Config.skipHeader;

fs.createReadStream(filePath)
  .pipe(csv({skipLines: skipLines}))
  .on("data", (data) => {
    data.Time = parseFloat(data.Time);
    results.push(data);
  })
  .on("end", async () => {
    console.log("CSV loaded:", results.length, "rows");
    const sanitizedResult = [];
    for(const row of results) {
      const sanitizedRow = {};
      for(const key in row) {
        const cleanKey = key.replace(/\u00A0/g, ' ').trim();
        sanitizedRow[cleanKey] = row[key];
      }
      sanitizedResult.push(sanitizedRow);
    }
    
    const yyyymmdd = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const data = Config.source === 'tempo' ? extractTempo(sanitizedResult) : sanitizedResult;
    await createWeeklyReport(data, yyyymmdd);
    await createZohoReport(data, yyyymmdd);

    console.log("Excel files generated 🎉");
  });

