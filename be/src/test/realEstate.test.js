import supertest from "supertest";
import db from "../models/index";
import { createServer } from "../utils/createServer";
import { expect } from "@jest/globals";
import { Op } from "sequelize";
import { userFactory } from "../factory/userFactory";

const app = createServer();
const request = supertest(app);

describe("get /api/real-estate/search", () => {
  const data = {
    queries: {},
    orders: {},
    page: 1,
  };

  test("Page is invalid", async () => {
    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, page: -1 });
    expect(response.status).toBe(400);
  });

  test("Get first page", async () => {
    const response = await request.post("/api/real-estate/search").send(data);

    expect(response.status).toBe(200);
    expect(response.body.data.list.length).toEqual(10);
    expect(response.body.data.total).toEqual(140);
  });

  test("Get real estate is interior", async () => {
    const queries = { isInterior: true };

    const total = await db.RealEstate.count({ where: { isInterior: true } });
    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, queries: queries });

    expect(response.status).toBe(200);
    expect(response.body.data.list.length).toEqual(10);
    expect(response.body.data.total).toEqual(total);
  });

  test("Get real estate is allowPet", async () => {
    const queries = { isAllowPet: true };

    const total = await db.RealEstate.count({
      where: { isPet: true },
    });

    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, queries: queries });

    expect(response.status).toBe(200);
    expect(response.body.data.list.length).toEqual(10);
    expect(response.body.data.total).toEqual(total);
  });

  test("Get real estate by type re", async () => {
    const queries = { type: "1" };

    const total = await db.RealEstate.count({
      where: { type: queries.type },
    });

    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, queries: queries });

    expect(response.status).toBe(200);
    expect(response.body.data.list.length).toEqual(10);
    expect(response.body.data.total).toEqual(total);
  });

  test("Get real estate by range cost", async () => {
    const queries = { costMin: 10000000, costMax: 100000000 };

    const total = await db.RealEstate.count({
      where: { cost: { [Op.gte]: queries.costMin, [Op.lte]: queries.costMax } },
    });

    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, queries: queries });

    expect(response.status).toBe(200);
    expect(response.body.data.total).toEqual(total);
  });

  test("Get real estate by range acreage", async () => {
    const queries = { acreageMin: 40, acreageMax: 1000 };

    const total = await db.RealEstate.count({
      where: {
        acreage: { [Op.gte]: queries.acreageMin, [Op.lte]: queries.acreageMax },
      },
    });

    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, queries: queries });

    expect(response.status).toBe(200);
    expect(response.body.data.total).toEqual(total);
  });

  test("Sort real estate", async () => {
    const orders = {
      createdAt: "DESC",
      acreage: "DESC",
      cost: "ASC",
    };

    var realEstates = await db.RealEstate.findAll({
      order: [
        ["createdAt", "DESC"],
        ["acreage", "DESC"],
        ["cost", "ASC"],
      ],
      attributes: ["id"],
      subQuery: false,
      limit: 10,
    });

    const response = await request
      .post("/api/real-estate/search")
      .send({ ...data, orders: orders });

    expect(response.status).toBe(200);
    const results = response.body.data.list;
    for (let i = 0; i < results.length; i++) {
      expect(realEstates[i].id).toEqual(results[i].id);
    }
  });
});

describe("get /full-house/:id", () => {
  test("id is a negative number", async () => {
    const response = await request.get("/api/real-estate/full-house/-1");

    expect(response.status).toBe(422);
  });

  test("id is invalid", async () => {
    const response = await request.get("/api/real-estate/full-house/1000");

    expect(response.status).toBe(404);
  });

  test("get full house success", async () => {
    const response = await request.get("/api/real-estate/full-house/1");

    expect(response.status).toBe(200);
  });

  test("view full house success", async () => {
    var user = await request
      .post("/api/auth/login")
      .send({ email: "seller@gmail.com", password: "password" });

    user = user.body.data;

    const response = await request
      .get("/api/real-estate/full-house/1")
      .set("Authorization", `Bearer ${user.token}`);

    const viewHistory = await db.ViewHistory.findOne({
      where: { realEstateId: 1, userId: user.user.id },
    });

    expect(response.status).toBe(200);
    expect(viewHistory).not.toBeNull();
  });
});

describe("get /posted-by-me", () => {
  var user = {};
  var seller = {};

  beforeAll(async () => {
    const newUser = await userFactory("1");

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

    const response2 = await request
      .post("/api/auth/login")
      .send({ email: "seller@gmail.com", password: "password" });

    user = response.body.data;
    seller = response2.body.data;
  });

  test("user not login", async () => {
    const response = await request.get("/api/real-estate/posted-by-me");

    expect(response.status).toBe(403);
  });

  test("user not seller", async () => {
    const response = await request
      .get("/api/real-estate/posted-by-me")
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toBe(403);
  });

  test("user not seller", async () => {
    const response = await request
      .get("/api/real-estate/posted-by-me")
      .set("Authorization", `Bearer ${seller.token}`);

    expect(response.status).toBe(200);
  });
});

describe("dump real-estate", () => {
  test("dump real-estate success", async () => {
    const response = await request.get("/api/real-estate/all");

    expect(response.status).toBe(200);
  });
});

describe("create real-estate /api/real-estate", () => {
  var user = {};

  beforeAll(async () => {
    const newUser = await userFactory({ role: "2" });

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

    user = response.body.data;
  });

  test("successfully", async () => {});
});
