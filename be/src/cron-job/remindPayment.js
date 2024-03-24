const cron = require('node-cron');
import { handleGetUserPayment } from "../controllers/remind"
    
var job = new cron.CronJob('0 1 1 * * *', async function() {
    await handleGetUserPayment()
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);