require("dotenv").config();

const request = require("supertest");
const app = require("../app");

describe("Routes Tests", () => {
  describe("GET /coins Route", () => {
    it("should return a status of 200 with a valid token", async () => {
      const response = await request(app)
        .get("/coins")
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.status).toBe(200);
    });

    it("should return a JSON array ", async () => {
      const response = await request(app)
        .get("/coins")
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return a list of coins with correct structure", async () => {
      const response = await request(app)
        .get("/coins")
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty("coin");
        expect(response.body[0]).toHaveProperty("type");
        expect(response.body[0]).toHaveProperty("price");
        expect(response.body[0]).toHaveProperty("reward");
      }
    });
  });

  describe("GET /pools/:coin Route", () => {
    const coin = "AKA";
    it("should return a status of 200 with a valid token", async () => {
      const response = await request(app)
        .get(`/pools/${coin}`)
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.status).toBe(200);
    });

    it("should return a JSON array when the pools for a spesific coin exist", async () => {
      const response = await request(app)
        .get(`/pools/${coin}`)
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return a list of pools for a specific coin with correct structure", async () => {
      const response = await request(app)
        .get(`/pools/${coin}`)
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      if (response.body.length > 0) {
        response.body.forEach((pool) => {
          expect(pool).toHaveProperty("id");
          expect(pool).toHaveProperty("name");
          expect(pool).toHaveProperty("website");
          expect(pool).toHaveProperty("type");
          expect(pool).toHaveProperty("founded");
          expect(pool).toHaveProperty("coins");
          expect(pool.coins).toHaveProperty(coin);
          const coinDetails = pool.coins[coin];
          expect(coinDetails).toHaveProperty("algorithm");
          expect(coinDetails).toHaveProperty("payoutThreshold");
          expect(coinDetails).toHaveProperty("rewardMethod");
          expect(coinDetails).toHaveProperty("fee");
        });
      }
    });

    it("should return a message and an empty array if no pools are found for the coin or the coin invalid", async () => {
      const coinWithNoPools = "ABS";
      const response = await request(app)
        .get(`/pools/${coinWithNoPools}`)
        .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        `No pools found for coin: ${coinWithNoPools}`
      );
      expect(response.body).toHaveProperty("pools");
      expect(response.body.pools).toBeInstanceOf(Array);
      expect(response.body.pools.length).toBe(0);
    });
  });
});
