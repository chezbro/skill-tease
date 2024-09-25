'use client'

import { FC, useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export const WalletConnection: FC = () => {
    const { wallet, connect, connecting, connected } = useWallet()
    const [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        if (wallet?.adapter?.publicKey) {
            setAddress(wallet.adapter.publicKey.toBase58())
        }
    }, [wallet, connected])

    return (
        <div className="flex items-center">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700">
                {connected ? 'Wallet' : 'Connect Wallet'}
            </WalletMultiButton>
            {connected && address && (
                <span className="ml-2 text-sm text-gray-300">
                    {address.slice(0, 4)}...{address.slice(-4)}
                </span>
            )}
        </div>
    )
}