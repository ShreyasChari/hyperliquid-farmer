
import React, { useState } from "react";
import { ethers } from "ethers";

export default function App() {
  const [wallet, setWallet] = useState("");
  const [connected, setConnected] = useState(false);
  const [strategy, setStrategy] = useState("simple");
  const [log, setLog] = useState([]);
  const [nftBoost, setNftBoost] = useState(false);
  const [hlName, setHlName] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);
      setConnected(true);
    } else {
      alert("Install MetaMask!");
    }
  };

  const simulate = () => {
    const logs = [];
    logs.push(`Strategy: ${strategy}`);
    if (strategy === "simple") {
      logs.push("25% Buy BTC, 25% Short BTC");
      logs.push("25% Buy HYPE, 25% Short HYPE");
      logs.push("Stake HYPE → stHYPE → HyperLend");
    } else {
      logs.push("Loop: Stake HYPE → Borrow → Stake repeatedly");
    }
    if (nftBoost) logs.push("NFT Boost enabled");
    if (hlName) logs.push("HL Name owned");
    logs.push("Est. ROI: 27.5% - 35%");
    setLog(logs);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Hyperliquid Farmer (Minimal UI)</h2>
      <button onClick={connectWallet}>
        {connected ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {wallet && <p>Wallet: {wallet}</p>}

      <hr />
      <div>
        <label>
          <input type="radio" name="strategy" value="simple" checked={strategy === "simple"} onChange={() => setStrategy("simple")} />
          Simple
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="radio" name="strategy" value="advanced" checked={strategy === "advanced"} onChange={() => setStrategy("advanced")} />
          Max Yield
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={nftBoost} onChange={() => setNftBoost(!nftBoost)} /> NFT Boost
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="checkbox" checked={hlName} onChange={() => setHlName(!hlName)} /> HL Name
        </label>
      </div>

      <button onClick={simulate} style={{ marginTop: 10 }}>Run Simulation</button>

      <pre style={{ background: '#eee', padding: 10, marginTop: 20 }}>
        {log.map((line, i) => <div key={i}>{line}</div>)}
      </pre>
    </div>
  );
}
