import { faker } from "@faker-js/faker";

export const dataCreateRealEstate = ({ userId }) => {
  return {
    userId: userId,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    type: "1",
    floorTotal: faker.random.number({ min: 1, max: 100 }),
    bedroomTotal: faker.random.number({ min: 1, max: 100 }),
    facade: faker.random.number({ min: 1, max: 100 }),
    acreage: faker.random.number({ min: 1000, max: 10000 }),
    cost: faker.random.number({ min: 10000000, max: 1000000000 }),
    isPet: true,
    autoPayment: true,
    isPaymentCoin: true,
    isInterior: true,
    isAllowPet: true,
    address: faker.address.streetAddress(),
    location: {
      lat: faker.random.number({ min: 1, max: 90 }),
      lng: faker.random.number({ min: 1, max: 180 }),
    },
  };
};
