const splToken = require('@solana/spl-token');
const { connection } = require('../config/connection');

async function manageSplTokenAccounts(wallets, tokenMintAddress) {
  const mint = new solanaWeb3.PublicKey(tokenMintAddress);

  for (const wallet of wallets) {
    const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(connection, wallet, mint, wallet.publicKey);
    console.log(Created SPL token account for wallet: ${wallet.publicKey.toBase58()});

    // Close token account after transactions to reclaim rent
    await splToken.closeAccount(connection, wallet, tokenAccount.address, wallet.publicKey, wallet);
  }
}

module.exports = {
  manageSplTokenAccounts,
};