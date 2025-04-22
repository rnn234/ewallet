const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.post('/topup', controller.topup);

module.exports = router;
