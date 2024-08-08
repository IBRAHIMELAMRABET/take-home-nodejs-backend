require("dotenv").config();

const request = require("supertest");
const app = require("../app");

describe("Authentication Middleware", () => {
  it("should return 200 OK with a valid token", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${process.env.BEARER_TOKEN}`)
      .expect(200);

    expect(response.body).toHaveProperty("message", "Success");
  });

  it("should return 401 Unauthorized without a token", async () => {
    const response = await request(app).get("/").expect(401);
  });

  it("should return 403 Forbidden with an invalid token", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", "Bearer fsjfdhsjfhjshdjfhsjdhfjshfhsjehheeee")
      .expect(403);
  });
  
});
