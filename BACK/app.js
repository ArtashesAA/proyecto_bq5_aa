const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const objetosRouter = require("./routes/objetos");
const productosRouter = require("./routes/productos");

app.use(cors());
app.use(express.json());

app.use("/api/objetos", objetosRouter);
app.use("/api/productos", productosRouter);

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "¡Hola mundo desde la API!" });
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
