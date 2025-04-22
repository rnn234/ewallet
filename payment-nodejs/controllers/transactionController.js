const { User, Transaction } = require('../models');
const { generateSnap } = require('../services/midtransService');

exports.topup = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transaction = await Transaction.create({
      user_id: user.id,
      type: 'topup',
      amount,
    });

    const midtransRes = await generateSnap(user, transaction);

    transaction.midtrans_order_id = midtransRes.token;
    await transaction.save();

    res.json({
      message: 'Topup initiated',
      transaction,
      midtrans_url: midtransRes.redirect_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
