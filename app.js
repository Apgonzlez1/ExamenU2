const express = require('express');
const http = require('http');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/api/routes/auth.routes');
const { setupWebsocket } = require('./src/infrastructure/websockets/chat.handler');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

connectDB(); // Conexión a MongoDB

app.use(express.json());
app.use('/api/auth', authRoutes);

setupWebsocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
console.log("🛠️ PORT:", process.env.PORT);
console.log("🛠️ MONGO_URI:", process.env.MONGO_URI);
console.log("🛠️ JWT_SECRET:", process.env.JWT_SECRET);