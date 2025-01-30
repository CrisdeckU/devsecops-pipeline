const request = require("supertest");
const app = require("./server");

describe("GET /", () => {
  it("Debe responder con '¡Hola, mundo!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, mundo!");
  });
});
