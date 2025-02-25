const fs = require('fs');
const csv = require('csv-parser');
const { userQueue } = require('./queue.js'); // Use require

userQueue.process(async (job) => {
  const { filePath } = job.data;
  const results = [];
  let rowCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
        rowCount++;
        job.progress(rowCount); // Update progress
      })
      .on('end', () => {
        fs.unlinkSync(filePath); // Clean up the file
        console.log(`File processed: ${rowCount} rows`);
        resolve(results); // Return parsed data
      })
      .on('error', (error) => {
        reject(error);
      });
  });
});
