import { faker } from "@faker-js/faker";
export const dateUserFactory = () => {
  const password = faker.internet.password();
  return {
    lastName: faker.internet.userName(),
    firstName: faker.internet.userName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password,
  };
};

export const infoUserFactory = () => {
  return {
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    location: {
      lat: 1,
      lng: 1,
    },
    wallet: "0x61E59ed67230B9a15582977A83146B47Ae1021fb",
    address: faker.location.street(),
    birthday: faker.date.birthdate(),
    gender: "1",
    maritalStatus: "1",
    signData: faker.internet.userName(),
  };
};
