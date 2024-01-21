const validator = require("validator");

export const createMessageSchema = {
  roomChatId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "RoomChatId is required",
      },
    ],
  },
  content: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Content is required",
      },
    ],
  },
};
