const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash"); // Usar una versión insegura de lodash a propósito

const port = process.env.PORT || 3000;

// Hardcoded API Key (Mala práctica)
const API_KEY = "123456789abcdef";

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta normal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Ruta con inyección SQL
app.get("/user", (req, res) => {
  const userId = req.query.id;
  res.send(`Usuario solicitado: ${userId}`); // No se valida el input, vulnerable a ataques
});

//Uso de `eval`, una mala práctica de seguridad
app.post("/execute", (req, res) => {
  try {
    const code = req.body.code;
    const result = eval(code); // 🔥 Código peligroso ejecutado sin validación
    res.json({ result });
  } catch (error) {
    res.status(500).send("Error en la ejecución del código.");
  }
});

//Dependencia de lodash utilizada con una vulnerabilidad conocida
app.get("/lodash", (req, res) => {
  const numbers = [1, 2, 3, 4, 5];
  res.json(_.shuffle(numbers)); // Solo para simular el uso de una dependencia vulnerable
});

//Mal manejo de errores (Sin middleware específico)
app.use((err, req, res, next) => {
  res.status(500).send("Algo salió mal");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Exportar la app para testing
module.exports = app;
