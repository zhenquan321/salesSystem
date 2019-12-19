import { Base64 } from "js-base64";

/**
 * use to create authorization headers
 * @param {*} userId
 * @param {*} token
 * @return uesrId_token
 */
export const authorization = (userId, token) => {
  if (token) {
    const base64 = Base64.encode(token + ":");
    return "Basic " + base64;
  }
  return null;
};
