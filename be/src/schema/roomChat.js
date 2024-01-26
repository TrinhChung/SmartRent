const validator = require("validator");

export const changeNameRoomChatSchema = {
  name: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Name is required",
      },
    ],
  },
};
