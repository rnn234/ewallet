const midtransClient = require('midtrans-client');
require('dotenv').config();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

module.exports = snap;
