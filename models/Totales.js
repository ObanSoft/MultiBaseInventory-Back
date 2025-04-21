const { pool } = require("../config/mysql");

const Totales = {
  getTotalPortatiles: async () => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT total FROM totales_portatiles WHERE id = 1`);
      return rows[0]?.total || 0;
    } finally {
      connection.release();
    }
  },
};

module.exports = Totales;
