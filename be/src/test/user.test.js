import { describe, expect } from "@jest/globals";
import { createServer } from "../utils/createServer";
import supertest from "supertest";
import { infoUserFactory } from "../factory/userFactory";
import db from "../models/index";
import { faker } from "@faker-js/faker";

const app = createServer();
const request = supertest(app);

describe("update /user/info", () => {
  var data = {};

  beforeAll(() => {
    data = infoUserFactory();
  });

  test("User not login", async () => {
    const response = await request
      .put("/api/user/info")
      .send({ ...data, email: null });
    expect(response.status).toBe(403);
  });

  describe("User login", () => {
    var user = {};

    beforeAll(async () => {
      const response = await request
        .post("/api/auth/login")
        .send({ email: "seller@gmail.com", password: "password" });

      user = response.body.data;
    });

    test("Payload haven't not email", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, email: null })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("Payload haven't not email", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, email: null })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("Payload haven't not location", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, location: null })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("Location invalid", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, location: { lat: 1000, lng: 1000 } })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("Signature is empty", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, signData: null })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("maritalStatus is valid", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, maritalStatus: "3" })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("gender is valid", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, gender: "3" })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("birthday is empty", async () => {
      const response = await request
        .put("/api/user/info")
        .send({ ...data, birthday: "birthday" })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });

    test("Update info person success", async () => {
      const response = await request
        .put("/api/user/info")
        .send(data)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.phoneNumber).toBe(data.phoneNumber);
      expect(response.body.data.gender).toEqual(data.gender);
      expect(response.body.data.signData).not.toBeNull();
      expect(response.body.data.wallet).toEqual(data.wallet);
      expect(response.body.data.Address.address).toEqual(data.address);
    });
  });
});

describe("Update /user/change-password", () => {
  var user = {};

  var data = {
    password: faker.internet.password(),
    oldPassword: "password",
  };

  beforeAll(async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "renter@gmail.com", password: "password" });

    user = response.body.data;
  });

  test("User not login", async () => {
    const response = await request
      .put("/api/user/change-password")
      .send({ ...data, email: null });
    expect(response.status).toBe(403);
  });

  test("Payload haven't not password", async () => {
    const response = await request
      .put("/api/user/change-password")
      .send({ ...data, password: null })
      .set("Authorization", `Bearer ${user.token}`);
    expect(response.status).toBe(422);
  });

  test("Payload haven't not oldPassword", async () => {
    const response = await request
      .put("/api/user/change-password")
      .send({ ...data, oldPassword: null })
      .set("Authorization", `Bearer ${user.token}`);
    expect(response.status).toBe(422);
  });

  test("OldPassword is invalid", async () => {
    const response = await request
      .put("/api/user/change-password")
      .send({ ...data, oldPassword: "password1" })
      .set("Authorization", `Bearer ${user.token}`);

    console.log(response.body);
    expect(response.status).toBe(400);
  });

  test("OldPassword is invalid", async () => {
    const response = await request
      .put("/api/user/change-password")
      .send(data)
      .set("Authorization", `Bearer ${user.token}`);

    await request
      .post("/api/auth/login")
      .send({ email: user.email, password: data.password });

    expect(response.status).toBe(200);
  });
});
