/* eslint-disable no-console */
const httpServer = require('./app');

httpServer.listen(process.env.BACKEND_PORT, () => console.log('App Running on port 3000'));
