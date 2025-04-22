const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./models');
const transactionRoutes = require('./routes/transactionRoutes');
const midtransRoutes = require('./routes/midtransRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/api', transactionRoutes);
app.use('/api', midtransRoutes);


sequelize.sync().then(() => {
  console.log('DB Connected & Synced!');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
