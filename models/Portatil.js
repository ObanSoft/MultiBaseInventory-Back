const { pool } = require("../config/mysql");

const Portatil = {
  create: async (data) => {
    const { serial, sistema_operativo, marca, modelo, procesador, ram, almacenamiento } = data;
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.query(
        `INSERT INTO portatiles (serial, sistema_operativo, marca, modelo, procesador, ram, almacenamiento)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [serial, sistema_operativo, marca, modelo, procesador, ram, almacenamiento]
      );
      await connection.query(`UPDATE totales_portatiles SET total = total + 1 WHERE id = 1`);
      await connection.commit();
      const [rows] = await connection.query(`SELECT * FROM portatiles WHERE id = ?`, [result.insertId]);
      return rows[0];
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  getAll: async () => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT * FROM portatiles`);
      return rows;
    } finally {
      connection.release();
    }
  },

  getByIdOrSerial: async (id, serial) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT * FROM portatiles WHERE id = ? OR serial = ?`, [id, serial]);
      return rows[0];
    } finally {
      connection.release();
    }
  },

  updateBySerial: async (serial, data) => {
    const { sistema_operativo, marca, modelo, procesador, ram, almacenamiento } = data;
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `UPDATE portatiles
        SET sistema_operativo = ?, marca = ?, modelo = ?, procesador = ?, ram = ?, almacenamiento = ?
        WHERE serial = ?`,
        [sistema_operativo, marca, modelo, procesador, ram, almacenamiento, serial]
      );
      return result.affectedRows;
    } finally {
      connection.release();
    }
  },

  obtenerSerialPorId: async (id) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT serial FROM portatiles WHERE id = ?`, [id]);
      return rows[0]; 
    } finally {
      connection.release();
    }
  },
  
  getTotal: async () => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT total FROM totales_portatiles WHERE id = 1`);
      return rows[0].total;
    } finally {
      connection.release();
    }
  },

  decrementTotal: async () => {
    const connection = await pool.getConnection();
    try {
      await connection.query(`UPDATE totales_portatiles SET total = total - 1 WHERE id = 1`);
    } finally {
      connection.release();
    }
  },

  delete: async (id) => {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(`DELETE FROM portatiles WHERE id = ?`, [id]);
      return result.affectedRows;
    } finally {
      connection.release();
    }
  },
};

module.exports = Portatil;
