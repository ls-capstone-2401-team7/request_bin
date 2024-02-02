const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env'),
});

const express = require('express');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'https://alessio-novi.cloud',
    methods: ['GET', 'POST'],
  },
});
const binRoutes = require('./routes/bins');
const endpointRoutes = require('./routes/endpoints');

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('binRomm', (binRomm) => {
    socket.join(binRomm);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

app.set('socketio', io);

app.use('/api/bins', binRoutes);
app.use('/api/endpoints', endpointRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code);
  return res.json({ message: error.message, code: error.code });
});

module.exports = httpServer;
