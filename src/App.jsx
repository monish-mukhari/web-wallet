import { useState } from 'react'
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';
import { generateMnemonic } from "bip39";
import './App.css'

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div>
        <button onClick={async () => {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}>Create Seed Phrase</button>
      </div> 

      <div>
        <input type='text' value={mnemonic}></input>
      </div>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  )
}

export default App
