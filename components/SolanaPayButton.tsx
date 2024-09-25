import React, { useState, useRef, useEffect } from 'react';
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

interface SolanaPayButtonProps {
  label: string;
  message: string;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({ label, message }) => {
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal && qrRef.current) {
      const urlParams: TransactionRequestURLFields = {
        recipient: new PublicKey('FdweEV5PGTbSs8rrrfbN5vtwxtuUHoratkZvkn6QcXYF'),
        splToken: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC SPL token address
        amount: new BigNumber(20), // $20 USDC
        label,
        message,
      };

      const url = encodeURL(urlParams);
      const qr = createQR(url);
      
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, [showModal, label, message]);

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-block group"
      >
        <span className="text-lg text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300 border-b-2 border-yellow-300 group-hover:border-yellow-100 pb-1">
          Get Priority Access for $20
        </span>
        <span className="ml-2 text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300">⚡</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl w-full mx-4">
            <h3 className="text-3xl font-bold mb-4 text-white text-center">Secure Your Priority Access</h3>
            <p className="text-gray-300 mb-6 text-center">
              Scan the QR code below with your Solana Pay-enabled wallet to get exclusive priority access.
            </p>
            <div ref={qrRef} className="mb-6 flex justify-center"></div>
            <div className="space-y-4 text-sm text-gray-400">
              <p>1. Open your Solana wallet app</p>
              <p>2. Scan the QR code or copy the payment address</p>
              <p>3. Confirm the payment of $20 USDC</p>
              <p>4. Wait for transaction confirmation</p>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <span className="text-yellow-400 font-semibold">$20 USDC</span>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://explorer.solana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Check payment status on Solana Explorer
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolanaPayButton;