const { connection } = require('../config/connection');

async function simulateTransactions(wallets) {
  for (const wallet of wallets) {
    const balance = await connection.getBalance(wallet.publicKey);
    if (balance < solanaWeb3.LAMPORTS_PER_SOL * 0.1) {
      console.error(Wallet ${wallet.publicKey.toBase58()} has insufficient balance.);
    }
  }
}

module.exports = {
  simulateTransactions,
};