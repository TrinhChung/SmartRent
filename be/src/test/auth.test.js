import { describe, expect, jest } from "@jest/globals";
import { createServer } from "../utils/createServer";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import db from "../models/index";
import { dateUserFactory } from "../factory/userFactory";
import jwt from "jsonwebtoken";

const app = createServer();
const request = supertest(app);

const data = dateUserFactory();
const dataUser = dateUserFactory();

describe("/auth/register", () => {
  test("Body haven't email", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, email: null });
    expect(response.status).toBe(422);
  });

  test("Email is valid", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, email: faker.internet.userName() });
    expect(response.status).toBe(422);
  });

  test("Email already exists", async () => {
    const response = await request.post("/api/auth/login").send({
      email: "seller@gmail.com",
      password: faker.internet.password(),
    });
    expect(response.status).toBe(400);
  });

  test("Body haven't first name", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, firstName: null });
    expect(response.status).toBe(422);
  });

  test("Body haven't last name", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, lastName: null });
    expect(response.status).toBe(422);
  });

  test("Body haven't password", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, password: null });
    expect(response.status).toBe(422);
  });

  test("Body haven't password confirm", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, passwordConfirm: null });
    expect(response.status).toBe(422);
  });

  test("Body password and password confirm not match", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ ...data, passwordConfirm: faker.internet.password() });
    expect(response.status).toBe(422);
  });

  describe("Register User", () => {
    test("api register user", async () => {
      const response = await request.post("/api/auth/register").send(data);
      const verify = await db.Verify.findOne({
        where: {
          fkId: response.body.data.id,
          type: "1",
          email: data.email,
        },
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Sign up successfully");
      expect(response.data).not.toBeNull();
      expect(verify).not.toBeNull();
    });
  });
});

describe("/verify/account/:token", () => {
  var verify = null;

  beforeAll(async () => {
    const response = await request.post("/api/auth/register").send(dataUser);
    verify = await db.Verify.findOne({
      where: {
        fkId: response.body.data.id,
        type: "1",
        email: dataUser.email,
      },
    });
  });

  test("Token not existing", async () => {
    const response = await request.get(`/api/verify/account/null`);

    expect(response.status).toBe(422);
  });

  test("verify user", async () => {
    const response = await request.get(`/api/verify/account/${verify.token}`);

    expect(response.status).toBe(200);
  });
});

describe("/auth/login", () => {
  test("Body haven't email", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: null, password: faker.internet.password() });
    expect(response.status).toBe(422);
  });

  test("Email is valid", async () => {
    const response = await request.post("/api/auth/login").send({
      email: faker.internet.userName(),
      password: faker.internet.password(),
    });
    expect(response.status).toBe(422);
  });

  test("Account not active", async () => {
    const response = await request.post("/api/auth/login").send({
      email: data.email,
      password: faker.internet.password(),
    });
    expect(response.status).toBe(422);
  });

  test("Body haven't password", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: faker.internet.email() });
    expect(response.status).toBe(422);
  });

  test("Body password or email is invalid", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: dataUser.email, password: faker.internet.password() });
    expect(response.status).toBe(400);
  });

  test("Login success", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: dataUser.email, password: dataUser.password });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.data.user).not.toBeNull();
    expect(response.body.data.token).not.toBeNull();
  });
});

describe("/auth/me", () => {
  var user = {};

  beforeAll(async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: dataUser.email, password: dataUser.password });

    user = response.body.data;
  });

  test("User is not authorized", async () => {
    const response = await request.get("/api/auth/me");

    expect(response.status).toBe(403);
  });

  test("Invalid action", async () => {
    const response = await request
      .get("/api/auth/me")
      .set("Authorization", `Bearer {user.token}`);
    expect(response.status).toBe(400);
  });

  test("Token expires", async () => {
    const response = await request
      .get("/api/auth/me")
      .set(
        "Authorization",
        `Bearer ${jwt.sign({ id: 100 }, process.env.JWT_SECRET)}`
      );
    expect(response.status).toBe(401);
  });

  test("Login me success", async () => {
    const response = await request
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toBe(200);
  });
});

describe("/auth/logout", () => {
  var user = {};

  beforeAll(async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: dataUser.email, password: dataUser.password });

    user = response.body.data;
  });

  test("User is not authorized", async () => {
    const response = await request.get("/api/auth/logout");

    expect(response.status).toBe(403);
  });

  test("Invalid action", async () => {
    const response = await request
      .get("/api/auth/logout")
      .set("Authorization", `Bearer {user.token}`);
    expect(response.status).toBe(400);
  });

  test("Token expires", async () => {
    const response = await request
      .get("/api/auth/logout")
      .set(
        "Authorization",
        `Bearer ${jwt.sign({ id: 100 }, process.env.JWT_SECRET)}`
      );
    expect(response.status).toBe(401);
  });

  test("Logout success", async () => {
    const response = await request
      .get("/api/auth/logout")
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toBe(200);
  });
});
