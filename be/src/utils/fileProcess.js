import { client } from "../config/connectRedis";

export const checkFileExistInSession = async (key) => {
  const image = await client.get(key);
  if (image) {
    return true;
  }
  return false;
};
