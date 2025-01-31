const request = require("supertest");
const app = require("../server");

describe("Pruebas de la API", () => {
  it("Debe responder con '¡Hola, mundo!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Hola, mundo!");
  });

  it("Debe devolver un usuario con ID proporcionado", async () => {
    const response = await request(app).get("/user?id=1");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Usuario solicitado: 1"); // Validación débil
  });

  it("Debe ejecutar código (inseguro)", async () => {
    const response = await request(app)
      .post("/execute")
      .send({ code: "2 + 2" });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(4);
  });

  it("Debe devolver una lista aleatoria con lodash", async () => {
    const response = await request(app).get("/lodash");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});

// 🔴❌ No se cierra correctamente Jest
afterAll(() => {
  process.exit(); // 🔥 Cierra Jest de forma abrupta (no recomendado)
});
