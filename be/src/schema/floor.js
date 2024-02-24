const validator = require("validator");

export const bulkCreateFloorsSchema = {
  floors: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "Floors is required",
      },
      {
        rule: (floors) => {
          for (var floor of floors) {
            if (!floor.cost) {
              return true;
            }
          }
          return false;
        },
        message: "Cost floor is required",
      },
      {
        rule: (floors) => {
          for (var floor of floors) {
            if (!floor.description) {
              return true;
            }
          }
          return false;
        },
        message: "Description floor is required",
      },
      {
        rule: (floors) => {
          for (var floor of floors) {
            if (!floor.files) {
              return true;
            }
          }
          return false;
        },
        message: "Files floor is required",
      },
      {
        rule: (floors) => {
          for (var floor of floors) {
            if (floor.files) {
              for (var file of floor.files) {
                if (!file.key) {
                  return true;
                }
              }
            }
          }
          return false;
        },
        message: "Image invalid",
      },
    ],
  },
  realEstateId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "RealEstateId is required",
      },
    ],
  },
};
