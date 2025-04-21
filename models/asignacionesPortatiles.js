const { pool } = require('../config/mysql');

const AsignacionesPortatiles = {
  async crear({ user_id_mongo, identificacion, serial_portatil, rol_usuario }) {
    const asignacionExistente = await this.buscarPorUsuarioIdentificacionYSerial(user_id_mongo, identificacion, serial_portatil);
    if (asignacionExistente.length > 0) {
      throw new Error('Ya existe una asignación con esos datos');
    }

    const sql = `INSERT INTO asignaciones 
      (user_id_mongo, identificacion, serial_portatil, rol_usuario)
      VALUES (?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [user_id_mongo, identificacion, serial_portatil, rol_usuario]);
    return result;
  },

  async buscarPorUsuarioIdentificacionYSerial(user_id_mongo, identificacion, serial_portatil) {
    const sql = `SELECT * FROM asignaciones WHERE user_id_mongo = ? AND identificacion = ? AND serial_portatil = ?`;
    const [rows] = await pool.query(sql, [user_id_mongo, identificacion, serial_portatil]);
    return rows;
  },

  async buscarPorIdentificacion(identificacion) {
    const sql = `SELECT * FROM asignaciones WHERE identificacion = ?`;
    const [rows] = await pool.query(sql, [identificacion]);
    return rows;
  },

  async editarPorSerial(serial_portatil, { user_id_mongo, identificacion, rol_usuario }) {
    const sql = `UPDATE asignaciones SET user_id_mongo = ?, identificacion = ?, rol_usuario = ? WHERE serial_portatil = ?`;
    const [result] = await pool.query(sql, [user_id_mongo, identificacion, rol_usuario, serial_portatil]);
    return result;
  },

  async eliminarPorSerialYIdentificacion(serial, identificacion) {
    const sql = `
      DELETE FROM asignaciones 
      WHERE serial_portatil = ? AND identificacion = ?
    `;
    const [result] = await pool.query(sql, [serial, identificacion]);
    return result.affectedRows;
  },
  
  

};

module.exports = AsignacionesPortatiles;
