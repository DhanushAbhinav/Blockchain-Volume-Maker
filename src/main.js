const { createWallets, distributeSol, returnRemainingSol } = require('./wallet/walletManager');
const { performBuySellOperations } = require('./wallet/volumeMaker');
const { manageSplTokenAccounts } = require('./token/tokenManager');
const { simulateTransactions } = require('./simulation/transactionSimulator');
const { monitorAndStabilizeToken } = require('./volatility/volatilityMonitor');
const solanaWeb3 = require('@solana/web3.js');

const primaryWallet = solanaWeb3.Keypair.generate();

async function main() {
  const wallets = await createWallets(10);  // Create 10 wallets
  await distributeSol(wallets, 5, primaryWallet);  // Distribute 5 SOL across wallets
  await performBuySellOperations(wallets, 20);  // 20 buy/sell operations
  await returnRemainingSol(wallets, primaryWallet);  // Return remaining SOL to primary wallet
  await manageSplTokenAccounts(wallets, 'TOKEN_MINT_ADDRESS');  // Manage SPL token accounts
  await simulateTransactions(wallets);  // Simulate and test transactions
  await monitorAndStabilizeToken('TOKEN_MINT_ADDRESS');  // Monitor and stabilize token
}

main().catch(console.error);