import React from 'react';
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

interface SolanaPayButtonProps {
  amount: number;
  recipient: string;
  label: string;
  message: string;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({ amount, recipient, label, message }) => {
  const handleClick = () => {
    const amountInLamports = new BigNumber(amount).times(LAMPORTS_PER_SOL);

    const urlParams: TransactionRequestURLFields = {
      recipient: new PublicKey(recipient),
      amount: amountInLamports,
      label,
      message,
    };

    const url = encodeURL(urlParams);
    const qr = createQR(url);

    // Open the QR code in a new window
    const qrWindow = window.open('', '_blank');
    qrWindow?.document.write(qr.toDataURL());
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block group"
    >
      <span className="text-lg text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300 border-b-2 border-yellow-300 group-hover:border-yellow-100 pb-1">
        Get Priority Access for ${amount}
      </span>
      <span className="ml-2 text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300">⚡</span>
    </button>
  );
};

export default SolanaPayButton;