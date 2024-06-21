import { faker } from "@faker-js/faker";

export const dataCreateRealEstate = ({ userId }) => {
  return {
    userId: userId,
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    type: "1",
    floorTotal: faker.number.int({ min: 1, max: 100 }),
    bedroomTotal: faker.number.int({ min: 1, max: 100 }),
    facade: faker.number.int({ min: 1, max: 100 }),
    acreage: faker.number.int({ min: 1000, max: 10000 }),
    cost: faker.number.int({ min: 10000000, max: 1000000000 }),
    isPet: true,
    autoPayment: true,
    isPaymentCoin: true,
    isInterior: true,
    isAllowPet: true,
    address: faker.location.streetAddress(),
    location: {
      lat: faker.number.int({ min: 1, max: 90 }),
      lng: faker.number.int({ min: 1, max: 180 }),
    },
  };
};
