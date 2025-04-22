const express = require('express');
const router = express.Router();
const controller = require('../controllers/midtransController');

router.post('/midtrans-callback', controller.callback);

module.exports = router;
