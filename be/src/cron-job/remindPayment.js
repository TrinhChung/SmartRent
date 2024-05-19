const cron = require("node-cron");
import { handleGetUserPayment } from "../controllers/remind";

export const autoPayment = new cron.schedule("0 1 1 * * *", async function () {
  await handleGetUserPayment();
});

export const testJob = new cron.schedule("*/10 * * * * *", async function () {
  // await handleGetUserPayment();
});
