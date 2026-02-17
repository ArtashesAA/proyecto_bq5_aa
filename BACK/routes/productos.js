const express = require('express');
const oracledb = require('oracledb');
const { getConnection } = require('../db/oracle');

const router = express.Router();

/* Obtener todos los productos */
router.get('/', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM PRODUCTOS ORDER BY ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Obtener producto por ID */
router.get('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const result = await connection.execute(
      `SELECT * FROM PRODUCTOS WHERE ID = :id`,
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Crear producto */
router.post('/', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { nombre, categoria, descripcion, precio, stock } = req.body;

    await connection.execute(
      `INSERT INTO PRODUCTOS 
       (NOMBRE, CATEGORIA, DESCRIPCION, PRECIO, STOCK)
       VALUES (:nombre, :categoria, :descripcion, :precio, :stock)`,
      [nombre, categoria, descripcion, precio, stock],
      { autoCommit: true }
    );

    res.status(201).json({ message: "Producto creado correctamente" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Actualizar producto */
router.put('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const { nombre, categoria, descripcion, precio, stock } = req.body;

    const result = await connection.execute(
      `UPDATE PRODUCTOS
       SET NOMBRE = :nombre,
           CATEGORIA = :categoria,
           DESCRIPCION = :descripcion,
           PRECIO = :precio,
           STOCK = :stock
       WHERE ID = :id`,
      [nombre, categoria, descripcion, precio, stock, id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado correctamente" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Eliminar producto */
router.delete('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const result = await connection.execute(
      `DELETE FROM PRODUCTOS WHERE ID = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
