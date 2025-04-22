const { Transaction, User } = require('../models');
const crypto = require('crypto');

exports.callback = async (req, res) => {
  try {
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status
    } = req.body;

    // Validasi signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const hash = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');

    if (hash !== signature_key) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    // Temukan transaksi
    const transaction = await Transaction.findOne({
      where: { midtrans_order_id: order_id }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      // Tambah saldo user jika belum
      if (transaction.status !== 'success') {
        const user = await User.findByPk(transaction.user_id);
        user.balance += transaction.amount;
        await user.save();

        transaction.status = 'success';
        await transaction.save();
      }
    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      transaction.status = 'failed';
      await transaction.save();
    }

    res.json({ message: 'Callback processed' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
