const CC = require("currency-converter-lt");

export const vndToWei = async (amount) => {
  const currencyConverter = new CC({ from: "VND", to: "ETH", amount: amount });
  const result = await currencyConverter.convert();

  return result;
};
