import { describe, expect } from "@jest/globals";
import { createServer } from "../utils/createServer";
import supertest from "supertest";
import { infoUserFactory } from "../factory/userFactory";

const app = createServer();
const request = supertest(app);

describe("update /info", () => {
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
        .send({ ...data, signData: null })
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toBe(422);
    });
  });
});
