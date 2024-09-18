const solanaWeb3 = require('@solana/web3.js')
const {connection} = require('../config/connection')

async function createWallets(numWallets) {
  const wallets = []
  for (let i = 0; i < numWallets; i++) {
    const wallet = solanaWeb3.Keypair.generate()
    wallets.push(wallet)
  }
  return wallets
}

async function distributeSol(wallets, totalSol, primaryWallet) {
  const solPerWallet = totalSol / wallets.length
  for (const wallet of wallets) {
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: primaryWallet.publicKey,
        toPubkey: wallet.publicKey,
        lamports: solanaWeb3.LAMPORTS_PER_SOL * solPerWallet,
      }),
    )
    await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [
      primaryWallet,
    ])
  }
}

async function returnRemainingSol(wallets, primaryWallet) {
  for (const wallet of wallets) {
    const balance = await connection.getBalance(wallet.publicKey)
    if (balance > 0) {
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: primaryWallet.publicKey,
          lamports: balance,
        }),
      )
      await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [
        wallet,
      ])
    }
  }
}

module.exports = {
  createWallets,
  distributeSol,
  returnRemainingSol,
};
