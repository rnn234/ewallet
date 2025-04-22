const snap = require('../config/midtrans');

const generateSnap = async (user, transaction) => {
  const parameter = {
    transaction_details: {
      order_id: `TOPUP-${transaction.id}-${Date.now()}`,
      gross_amount: transaction.amount,
    },
    customer_details: {
      first_name: user.name,
      email: user.email,
    }
  };

  return await snap.createTransaction(parameter);
};

module.exports = { generateSnap };
