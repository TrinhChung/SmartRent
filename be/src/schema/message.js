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
    optional: true,
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Content is required",
      },
    ],
  },
  files: {
    optional: true,
    rules: [
      {
        rule: (input) => {
          if (input.length > 0) {
            for (var file of input) {
              if (!file?.key) {
                return true;
              }
            }
          }
          return false;
        },
        message: "File required field ",
      },
    ],
  },
};
