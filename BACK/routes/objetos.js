const express = require('express');
const { getConnection } = require('../db/oracle');

const router = express.Router();

/* Get all objetos */
router.get('/', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM OBJETOS`
    );

    res.json(result.rows);

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Get objeto by ID */
router.get('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const result = await connection.execute(
      `SELECT * FROM OBJETOS WHERE ID = :id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Objeto no existe" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Create new objeto */
router.post('/', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { nombre, categoria, imagen, descripcion } = req.body;

    await connection.execute(
      `INSERT INTO OBJETOS (NOMBRE, CATEGORIA, IMAGEN, DESCRIPCION)
       VALUES (:nombre, :categoria, :imagen, :descripcion)`,
      [nombre, categoria, imagen, descripcion],
      { autoCommit: true }
    );

    res.status(201).json({ message: "Objeto creado correctamente" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Update objeto */
router.put('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const { nombre, categoria, imagen, descripcion } = req.body;

    const result = await connection.execute(
      `UPDATE OBJETOS
       SET NOMBRE = :nombre,
           CATEGORIA = :categoria,
           IMAGEN = :imagen,
           DESCRIPCION = :descripcion
       WHERE ID = :id`,
      [nombre, categoria, imagen, descripcion, id],
      { autoCommit: true }
    );

    res.json({ message: "Objeto actualizado" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

/* Delete objeto */
router.delete('/:id', async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    await connection.execute(
      `DELETE FROM OBJETOS WHERE ID = :id`,
      [id],
      { autoCommit: true }
    );

    res.json({ message: "Objeto eliminado" });

  } catch (error) {
    next(error);
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
