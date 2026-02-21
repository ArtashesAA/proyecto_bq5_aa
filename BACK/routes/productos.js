const express = require("express");
const oracledb = require("oracledb");
const { getConnection } = require("../db/oracle");

const router = express.Router();

/* Obtener todos los productos */
router.get("/", async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM PRODUCTOS ORDER BY ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Devuelve un objeto por nombre */
router.get("/buscar/:nombre", async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { nombre } = req.params;

    // Comando
    const result = await connection.execute(
      `SELECT * FROM PRODUCTOS 
       WHERE LOWER(NOMBRE) LIKE LOWER(:nombre)`,
      [`%${nombre}%`],
    );

    // Resultado
    res.json(result.rows);
  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Filtra por categoría */
router.get("/categoria/:categoria", async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { categoria } = req.params;

    const result = await connection.execute(
      `SELECT * FROM PRODUCTOS 
       WHERE LOWER(CATEGORIA) LIKE LOWER(:categoria)`,
      [`%${categoria}%`],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
