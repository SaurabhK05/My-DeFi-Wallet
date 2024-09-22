"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Info } from "lucide-react";
import { generateMnemonic } from "bip39";
import { generateSolanaKeys } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { walletSecret } from "@/lib/features/walletSlice";
import { WalletDetails } from "./wallet-details";

export function WalletInfoAndAdd() {
  const [walletSecratPhrase, setwalletSecratPhrase] = useState("");
  const [renderWallet, setRenderWallet] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddWallet = async () => {
    if (!walletSecratPhrase) {
    }
    const mnemonic = generateMnemonic();
    const { publicKey, privateKey } = generateSolanaKeys(mnemonic);

    if (publicKey && privateKey) {
      dispatch(walletSecret({ publicKey, privateKey }));
      setRenderWallet(true);
    }
    setwalletSecratPhrase("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-zinc-950">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              DeFi Wallet Information
            </CardTitle>
            <CardDescription>
              Learn about our wallet and add your own
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Info className="w-5 h-5" />
                About Our Wallet
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Our DeFi wallet is a secure, non-custodial solution for managing
                your digital assets. It supports multiple blockchains and
                provides seamless integration with various DeFi protocols.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Created By</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Developed by the 0xSK, a blockchain enthusiasts.
              </p>
            </section>

            <div className="pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">Add Your Wallet</h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your secret phrase (or leave blank to generate)"
                  value={walletSecratPhrase}
                  onChange={(e) => {
                    setwalletSecratPhrase(e.target.value);
                  }}
                  className="flex-grow"
                />
                <Button
                  onClick={handleAddWallet}
                  className="flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>
                    {walletSecratPhrase ? "Add Wallet" : "Generate Wallet"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
          {renderWallet && <WalletDetails />}
        </Card>
      </main>
      <footer className="py-4 text-center text-sm text-white dark:text-zinc-400 bg-black">
        © 2024 0xSK. All rights reserved.
      </footer>
    </div>
  );
}
