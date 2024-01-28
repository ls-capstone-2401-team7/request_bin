/* eslint-disable no-console */
const app = require('./app');

app.listen(process.env.BACKEND_PORT, () => console.log('App Running on port 3000'));
