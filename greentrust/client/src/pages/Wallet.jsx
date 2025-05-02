import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import '../style/Wallet.css';

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask not detected. Please install MetaMask.");
        // Redirect to MetaMask installation page
        window.open("https://metamask.io/download.html", "_blank");
        return;
      }

    // Check if the user is logged in
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      // Check if the wallet is already connected
      const currentAccount = await window.ethereum.request({ method: 'eth_accounts' });
      if (currentAccount.length > 0) {
        setWalletAddress(currentAccount[0]);
        return;
      }

      // Request accounts from MetaMask if not connected
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Set the wallet address to state
      setWalletAddress(address);

      // Send wallet address to the backend for linking
      const res = await axios.post("http://localhost:5000/api/wallet/link", {
        userId,
        walletAddress: address,
      });

      alert("Wallet linked successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet.");
    }
  };

  const unlinkWallet = async () => {
    try {
      // Send a request to unlink the wallet
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/wallet/unlink', {
        userId,
      });

      // Reset wallet address in state
      setWalletAddress('');

      alert(response.data.message);
    } catch (error) {
      console.error('Error unlinking wallet:', error);
      alert('Error unlinking wallet');
    }
  };

  return (
    <div className="wallet-page">
      <h2>Link Your Crypto Wallet</h2>
      <button onClick={connectWallet} className="wallet-connect-btn">
        {walletAddress ? 'Wallet Linked' : 'Connect Wallet'}
      </button>
      {walletAddress && (
        <>
          <p>Connected Wallet Address: {walletAddress}</p>
          <button onClick={unlinkWallet} className="wallet-unlink-btn">
            Unlink Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default Wallet;
