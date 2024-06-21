import { describe, expect } from "@jest/globals";
import { createServer } from "../utils/createServer";
import supertest from "supertest";
import { infoUserFactory, userFactory } from "../factory/userFactory";
import { faker } from "@faker-js/faker";
import db from "../models/index";

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
      const newUser = await userFactory("1");

      const response = await request
        .post("/api/auth/login")
        .send({ email: newUser.email, password: "password" });

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
    const newUser = await userFactory("1");

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

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

    expect(response.status).toBe(400);
  });

  test("OldPassword is success", async () => {
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

describe("Update /update-wallet", () => {
  var user = {};

  const walletAddress = faker.finance.ethereumAddress();

  beforeAll(async () => {
    const newUser = await userFactory("1");

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

    user = response.body.data;
  });

  test("User not login", async () => {
    const response = await request
      .put("/api/user/update-wallet")
      .send({ wallet: walletAddress });
    expect(response.status).toBe(403);
  });

  test("wallet address is invalid", async () => {
    const response = await request
      .put("/api/user/update-wallet")
      .send({ wallet: "walletAddress" })
      .set("Authorization", `Bearer ${user.token}`);
    expect(response.status).toBe(422);
  });

  test("wallet address is invalid", async () => {
    const response = await request
      .put("/api/user/update-wallet")
      .send({ wallet: "walletAddress" })
      .set("Authorization", `Bearer ${user.token}`);
    expect(response.status).toBe(422);
  });

  test("update wallet address successfully", async () => {
    const response = await request
      .put("/api/user/update-wallet")
      .send({ wallet: walletAddress })
      .set("Authorization", `Bearer ${user.token}`);

    const updateUser = await request
      .post("/api/auth/login")
      .send({ email: user.user.email, password: "password" });

    user = updateUser.body.data.user;

    expect(response.status).toBe(200);
    expect(user.wallet).toEqual(walletAddress);
  });
});

describe("/request-forgot-password", () => {
  var user = {};

  beforeAll(async () => {
    user = await userFactory("1");
  });

  test("Payload haven't email", async () => {
    const response = await request
      .post("/api/user/request-forgot-password")
      .send({ email: null });
    expect(response.status).toBe(422);
  });

  test("Email not exist", async () => {
    const response = await request
      .post("/api/user/request-forgot-password")
      .send({ email: faker.internet.email() });
    expect(response.status).toBe(422);
  });

  test("Request forgot password successfully", async () => {
    const response = await request
      .post("/api/user/request-forgot-password")
      .send({ email: user.email });

    var verify = await db.Verify.findOne({
      where: { email: user.email, type: "2" },
    });

    expect(response.status).toBe(200);
    expect(verify).not.toBeNull();
  });
});

describe("/reset-password", () => {
  var user = {};
  var verify = {};

  beforeAll(async () => {
    user = await userFactory("1");

    await request
      .post("/api/user/request-forgot-password")
      .send({ email: user.email });

    verify = await db.Verify.findOne({
      where: { email: user.email, type: "2" },
    });
  });

  test("Payload haven't token", async () => {
    const response = await request
      .put("/api/user/reset-password")
      .send({ password: "password" });

    expect(response.status).toBe(422);
  });

  test("Payload haven't password", async () => {
    const response = await request
      .put("/api/user/reset-password")
      .send({ token: "password" });

    expect(response.status).toBe(422);
  });

  test("Token is invalid", async () => {
    const response = await request
      .put("/api/user/reset-password")
      .send({ password: "password1", token: "password" });

    expect(response.status).toBe(400);
  });

  test("Reset password successfully", async () => {
    const response = await request
      .put("/api/user/reset-password")
      .send({ password: "password1", token: verify.token });

    const updateUser = await request
      .post("/api/auth/login")
      .send({ email: user.email, password: "password1" });

    console.log(updateUser.body);

    expect(response.status).toBe(200);
    expect(updateUser.status).toBe(200);
  });
});

describe("get /sign/:id", () => {
  var user = {};
  var data = {};

  beforeAll(async () => {
    data = infoUserFactory();
    const newUser = await userFactory("1");

    const response = await request
      .post("/api/auth/login")
      .send({ email: newUser.email, password: "password" });

    user = response.body.data;
  });

  test("user not login", async () => {
    const response = await request.get("/api/user/sign/1");
    expect(response.status).toBe(403);
  });

  test("sign is null", async () => {
    const response = await request
      .get("/api/user/sign/1")
      .set("Authorization", `Bearer ${user.token}`);
    expect(response.status).toBe(403);
  });

  test("get sign successfully", async () => {
    const info = await request
      .put("/api/user/info")
      .send(data)
      .set("Authorization", `Bearer ${user.token}`);

    const signatureId = info.body.data.signatureId;

    const response = await request
      .get(`/api/user/sign/${signatureId}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(info.status).toBe(200);
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();
  });
});
