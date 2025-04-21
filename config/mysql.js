const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "inventario_portatiles",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectMySQL = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión establecida a la base de datos MySQL");
    connection.release(); 
  } catch (error) {
    console.error("Error al conectar a MySQL:", error.message);
    process.exit(1); 
  }
};

module.exports = { pool, connectMySQL };