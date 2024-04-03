import { faker } from "@faker-js/faker";
import db from "../models/index";

export const dataUserFactory = () => {
  const password = faker.internet.password();
  return {
    lastName: faker.internet.userName(),
    firstName: faker.internet.userName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password,
  };
};

export const userFactory = async () => {
  try {
    const user = await db.User.create({
      lastName: faker.internet.userName(),
      firstName: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password",
      isActive: true,
    });

    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
  }
};

export const infoUserFactory = () => {
  return {
    email: faker.internet.email(),
    phoneNumber: faker.phone.number("039#######"),
    location: {
      lat: 1,
      lng: 1,
    },
    wallet: faker.finance.ethereumAddress(),
    address: faker.location.street(),
    birthday: faker.date.birthdate(),
    gender: "1",
    maritalStatus: "1",
    signData: faker.internet.userName(),
  };
};
