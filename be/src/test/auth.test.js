import { describe, expect } from "@jest/globals";
import { createServer } from "../utils/createServer";
import supertest from "supertest";

const app = createServer();
const request = supertest(app);

describe("setPackages", () => {
  test("Test", async () => {
    const data = {
      lastName: "john",
      firstName: "John",
      email: "chungtrinh2k2@gmail.com",
      password: "123456",
      passwordConfirm: "123456",
    };
    const response = await request.post("/api/auth/register").send(data);
    console.log(response);
    expect(response.status).toBe(200);
    expect(1).toEqual(1);
  });
});
