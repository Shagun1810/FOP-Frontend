import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from '../erc1155ABI.json'

const YOUR_CONTRACT_ADDRESS = "0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6";

export default function Test() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [metaMaskEnabled, setMetaMaskEnabled] = useState(false);

  let getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    return contract;
  };

  let getPropertydetails = async() =>{
    const tx = await getContract().getAllTokens();
    // const response = await tx.wait();
    console.log(tx);
  }

  let incrementCount = async () => {
    const tx = await getContract().increment();
    alert("Once block is mined, Value will be auto updated");
    // await tx.wait();
    // fetchCurrentValue();
  };

  let fetchCurrentValue = async () => {
    let count_ = await getContract().getCount();
    console.log(+count_.toString());
    setCount(count_.toString());
    setLoading(false);
  };

  const checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        setMetaMaskEnabled(false);
        return;
      }

      // Change network to rinkeby
    //   await ethereum.enable();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x5` }],
      });
      console.log("Connected", accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      setMetaMaskEnabled(true);

      // Listen to event
    //   listenToEvent();
    getPropertydetails();

      // Fetch the current counter value
    //   fetchCurrentValue();
    } catch (error) {
      console.log(error);
      setMetaMaskEnabled(false);
    }
  };

  useEffect(() => {
    checkedWallet();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        checkedWallet();
      });
    }
  }, []);

  let listenToEvent = async () => {
    getContract().on("counterIncremented", async (sender, value, event) => {
      // Called when anyone changes the value
      setCount(+value.toString());
    });
  };

  const mintToken = async() =>{
    const tx = await getContract().mintNewToken("test2", [],[]);
    console.log(tx);
  }

  return (
    <div className="root">
      "hi"
      {!metaMaskEnabled && <h1>Connect to Metamask</h1>}
      {metaMaskEnabled && (
        <div>
          <button onClick={mintToken}>Click</button>
        </div>
      )}
    </div>
  );
}
