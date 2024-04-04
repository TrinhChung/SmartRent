import { createServer } from "../utils/createServer";
import supertest from "supertest";
import { userFactory } from "../factory/userFactory";
import { client, connectRedis } from "../config/connectRedis";

const path = require("path");
const app = createServer();
const request = supertest(app);

describe("upload file /api/file/upload/image", () => {
  var user = {};

  beforeAll(async () => {
    await connectRedis();
    const newUser = await userFactory("1");

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

    user = response.body.data;
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test("payload not contain file", async () => {
    const response = await request
      .post("/api/file/upload/image")
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toEqual(422);
  });

  test("should return 200", async () => {
    const filePath = path.join(path.resolve("./images/"), "house2.jpg");

    const response = await request
      .post("/api/file/upload/image")
      .attach("file", filePath)
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toEqual(200);
  });

  test("image already uploaded", async () => {
    const filePath = path.join(path.resolve("./images/"), "house2.jpg");

    const response = await request
      .post("/api/file/upload/image")
      .attach("file", filePath)
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toEqual(200);
  });
});
