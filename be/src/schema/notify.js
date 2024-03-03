export const readNotifySchema = {
  notifyId: {
    rules: [
      {
        rule: (input) => !input || typeof input !== "number",
        message: "notifyId is required",
      },
    ],
  },
};
