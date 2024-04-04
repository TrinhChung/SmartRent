const validator = require("validator");

export const createRealEstateSchema = {
  name: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "Name is required",
      },
    ],
  },
  address: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "address is required",
      },
    ],
  },
  location: {
    rules: [
      {
        rule: (input) => !input,
        message: "location is required",
      },
    ],
  },
  type: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "type is required",
      },
    ],
  },
  acreage: {
    rules: [
      {
        rule: (input) => !input,
        message: "Acreage is required",
      },
    ],
  },
  cost: {
    rules: [
      {
        rule: (input) => input === null || input === undefined,
        message: "Cost is required",
      },
    ],
  },
  status: {
    optional: true,
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "Status is required",
      },
    ],
  },
  floorTotal: {
    optional: true,
    rules: [
      {
        rule: (input) => input < 0,
        message: "floorTotal is invalid",
      },
    ],
  },
  bedroomTotal: {
    optional: true,
    rules: [
      {
        rule: (input) => input < 0,
        message: "bedroomTotal is invalid",
      },
    ],
  },
  toiletTotal: {
    optional: true,
    rules: [
      {
        rule: (input) => input < 0,
        message: "toiletTotal is invalid",
      },
    ],
  },
  facade: {
    optional: true,
    rules: [
      {
        rule: (input) => input < 0,
        message: "facade is invalid",
      },
    ],
  },
  directionHouse: {
    optional: true,
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "directionHouse is invalid",
      },
    ],
  },
  imgRealEstate: {
    optional: true,
    rules: [
      {
        rule: (input) => !input,
        message: "imgRealEstate is required",
      },
      {
        rule: (images) => {
          for (var image of images) {
            if (!image.name || !image.key) {
              return true;
            }
          }
          return false;
        },
        message: "Image invalid",
      },
    ],
  },
};

export const getRealEstateFullHouseSchema = {
  id: {
    rules: [
      {
        rule: (input) => !input || input < 1,
        message: "Id is required",
      },
    ],
  },
};
