import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { sign } from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSolanaKeys(mnemonic: string): {
  publicKey: string;
  privateKey: string;
} {
  if (!validateMnemonic(mnemonic)) {
    console.error("Invalid mnemonic");
    return { publicKey: "", privateKey: "" };
  }
  const seed = mnemonicToSeedSync(mnemonic);
  const derivationPath = "m/44'/501'/0'/0'";
  const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;

  const keyPair = sign.keyPair.fromSeed(derivedSeed);

  const privateKey = bs58.encode(keyPair.secretKey);
  const publicKey = bs58.encode(keyPair.publicKey);

  return { publicKey, privateKey };
}
