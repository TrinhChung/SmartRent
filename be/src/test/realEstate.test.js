import supertest from "supertest";
import db from "../models/index";
import { createServer } from "../utils/createServer";
import { expect } from "@jest/globals";

const app = createServer();
const request = supertest(app);

describe("get /api/real-estate/search", () => {
  const data = {
    queries: [],
    orders: [],
    page: -1,
  };

  test("Page is invalid", async () => {
    const response = await request.post("/api/real-estate/search").send(data);
    expect(response.status).toBe(400);
  });

  test("Page is invalid", async () => {
    const response = await request.post("/api/real-estate/search").send(data);
    expect(response.status).toBe(400);
  });
});
