import redisClient from "../config/redis";
import { decrypt, encrypt, returnTTL } from "../helper";
import SendResponse from "../helper/sendResponse";
import { uuid } from "../helper/index";
import { createUrlSchema, getUrlSchema } from "../helper/validate";

export default class Nocred extends SendResponse {
  constructor() {
    super();
  }

  async createUrl(res, payload) {
    console.log({ payload });
    const { error, value } = createUrlSchema.validate(payload);

    if (error) {
      return this.error(res, "--createUrl/invalid-field", error.message, 400);
    }

    // check if expiry is valid
    const validExp = ["1day", "1week", "3weeks"];
    if (!validExp.includes(payload?.expiration?.exp)) {
      return this.error(
        res,
        "--createUrl/invalid-expiry",
        "expiry field is invalid.",
        400
      );
    }

    const userId = payload?.userId;
    const url_Id = uuid(8);
    const cacheKey = url_Id; // [userid, urlId]
    const expiration = returnTTL(payload?.expiration?.exp);
    const cacheData = {
      userId,
      url_Id,
      expiration,
      encSession: encrypt(payload?.sessionId),
    };

    await redisClient.set(cacheKey, JSON.stringify(cacheData));
    await redisClient.expire(cacheKey, expiration);

    this.success(
      res,
      "--createUrl/success",
      "secure url created successsfully",
      200,
      cacheData
    );
  }

  async getUrl(res, payload) {
    const { error } = getUrlSchema.validate(payload);
    if (error) {
      return this.error(res, "--getUrl/invalid-field", error?.message, 400);
    }

    const { id } = payload;
    const urlInfo = await redisClient.get(id);

    console.log({ id, urlInfo });

    if (urlInfo === null) {
      return this.error(
        res,
        "--getUrl/notfound",
        "The URL is either not found or has expired.",
        404
      );
    }

    const data = urlInfo;

    this.success(res, "--getUrl/success", "successfully fetched url", 200, {
      encSession: data?.encSession,
      userId: data.userId,
    });
  }

  async deleteUrl() {}
}
