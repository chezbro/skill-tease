import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

interface SolanaPayButtonProps {
  amount: number;
  recipient: string;
  label: string;
  message: string;
  onSuccess: () => void;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({ amount, recipient, label, message, onSuccess }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);

    try {
      const recipientPubkey = new PublicKey(recipient);
      const amountInLamports = new BigNumber(amount).times(LAMPORTS_PER_SOL).toNumber();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: amountInLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      console.log('Transaction successful:', signature);
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="inline-block group"
    >
      <span className="text-lg text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300 border-b-2 border-yellow-300 group-hover:border-yellow-100 pb-1">
        {isLoading ? 'Processing...' : `Get Priority Access for ${amount} SOL`}
      </span>
      <span className="ml-2 text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300">⚡</span>
    </button>
  );
};

export default SolanaPayButton;