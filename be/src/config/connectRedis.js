import { createClient } from "redis";
require("dotenv").config();
export var client = null;

export const connectRedis = async () => {
  client = createClient({
    socket: {
      username: "default",
      host: process.env.HOST_REDIS,
      port: process.env.PORT_REDIS,
    },
  });

  client.on("error", (err) => {
    console.log(err);
  });

  await client.connect();
  console.log("Connect Redis successfully");
};
