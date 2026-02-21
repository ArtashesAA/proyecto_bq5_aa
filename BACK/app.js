// Importa Express
const express = require("express");
// Permite peticiones desde api
const cors = require("cors");

// Aplicación
const app = express();
const PORT = 3000;

// Importa productos
const productosRouter = require("./routes/productos");

// Activa cors
app.use(cors());
// Permite json
app.use(express.json());

// Ruta productos
app.use("/api/productos", productosRouter);

// Inicia el servidor en el puerto anteriormente declarado
app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
