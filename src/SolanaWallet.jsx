import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return <div>
        <button onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            // console.log(derivedSeed);
            
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            // console.log(secret);
            
            const keypair = Keypair.fromSecretKey(secret);
            // console.log(keypair);
            
            setCurrentIndex(currentIndex + 1);
            console.log(keypair.publicKey);
            
            setPublicKeys([...publicKeys, keypair.publicKey.toString()]);
            console.log(publicKeys);
            
        }}>
            Add SOL wallet
        </button>
        {publicKeys.map(p => (
            <div>
                {p}
            </div>
        ))}
    </div>
}