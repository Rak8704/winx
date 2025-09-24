"use client";

import React, { useEffect, useState } from "react";

const PaymentWalletsDebugPage = () => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch("/api/debug/payment-wallets");
        const data = await response.json();
        
        if (data.success) {
          setWallets(data.paymentWallets);
        } else {
          setError(data.error || "Failed to fetch payment wallets");
        }
      } catch (err) {
        setError("Failed to fetch payment wallets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Wallets Debug</h1>
      <p className="mb-4">Total wallets: {wallets.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{wallet.walletName}</h2>
            <p className="mb-2">Type: {wallet.walletType}</p>
            <p className="mb-2">ID: {wallet.id}</p>
            
            <div className="mb-2">
              <p className="font-medium">Image:</p>
              {wallet.walletLogo ? (
                <div>
                  <img 
                    src={wallet.walletLogo} 
                    alt={wallet.walletName} 
                    className="w-24 h-24 object-contain border rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21'/%3E%3C/svg%3E";
                      target.alt = "Image not found";
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1 truncate">{wallet.walletLogo}</p>
                </div>
              ) : (
                <p className="text-gray-500">No image URL</p>
              )}
            </div>
            
            <div>
              <p className="font-medium">Deposit Wallets:</p>
              {wallet.depositWallets && wallet.depositWallets.length > 0 ? (
                <ul className="list-disc pl-5">
                  {wallet.depositWallets.map((dw: any) => (
                    <li key={dw.id}>
                      Min: {dw.minDeposit?.toString()}, Max: {dw.maximumDeposit?.toString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No deposit wallets</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentWalletsDebugPage;