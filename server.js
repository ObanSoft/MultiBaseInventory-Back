const express = require('express');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/db'); 
const { connectMySQL } = require('./config/mysql'); 
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth'); 
const portatilesRoutes = require('./routes/portatiles'); 
const totalesRoutes = require('./routes/totales');
const asignacionesRouter = require('./routes/asignacionesPortatiles');

dotenv.config();

const app = express();
app.use(express.json());

connectMongoDB();
connectMySQL();

app.use('/api/auth', authRoutes); 
app.use('/api/portatiles', portatilesRoutes); 
app.use("/api/totales", totalesRoutes);
app.use('/api/asignaciones', asignacionesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});