import { createServer } from "./utils/createServer";
import connectDB from "./config/connectDB";
import { connectRedis } from "./config/connectRedis";
import { testJob, autoPayment } from "./cron-job/remindPayment";
require("dotenv").config();

connectDB();
connectRedis();
const server = createServer();

autoPayment.start();
testJob.start();

let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("listening on port: " + port);
});
