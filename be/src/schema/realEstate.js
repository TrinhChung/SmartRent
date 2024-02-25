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

  cost: {
    rules: [
      {
        rule: (input) =>
          input === null || input === undefined || validator.isEmpty(input),
        message: "Cost is required",
      },
    ],
  },
  acreage: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "Acreage is required",
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
  imgRealEstate: {
    optional: true,
    rules: [
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
        rule: (input) => !input || validator.isEmpty(input),
        message: "Id is required",
      },
    ],
  },
};
