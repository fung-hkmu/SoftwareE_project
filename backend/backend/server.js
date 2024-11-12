const express = require('express');
const bodyParser = require('body-parser');
const { connectAndInitBucket } = require('./config/image');
const { port } = require('./config/env');

const app = express();

app.use(bodyParser.json());

const startServer = async () => {
  await connectAndInitBucket();
  const initRoutes = require('./routes/routes');
  initRoutes(app);
};

startServer().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
