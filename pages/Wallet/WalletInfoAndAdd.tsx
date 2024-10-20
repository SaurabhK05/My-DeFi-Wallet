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
import { PlusCircle, Info, DeleteIcon } from "lucide-react";
import { generateMnemonic } from "bip39";
import { generateSolanaKeys } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { walletSecret } from "@/lib/features/walletSlice";
import { WalletDetails } from "./WalletDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/footer/footer";
import { WALLET_ABOUT_DESC } from "@/constants/wallet/pageConstant";

export function WalletInfoAndAdd() {
  const [walletSecretPhrase, setwalletSecratPhrase] = useState("");
  const [renderSecret, setRenderSecret] = useState<string[]>([]);
  const [renderWallet, setRenderWallet] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleAddWallet = async () => {
    if (!walletSecretPhrase) {
    }
    const mnemonic = generateMnemonic();
    setwalletSecratPhrase(mnemonic);
    const phraseArray = mnemonic.split(" ");
    setRenderSecret(phraseArray);

    const { publicKey, privateKey } = generateSolanaKeys(mnemonic);

    if (publicKey && privateKey) {
      dispatch(walletSecret({ publicKey, privateKey }));
      setRenderWallet(true);
    }
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
            {renderWallet ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-semibold">
                    Your Secret Phrase
                  </AccordionTrigger>
                  <AccordionContent
                    className="flex flex-wrap cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(walletSecretPhrase);

                      toast({
                        title: "Secret Phrase Copied",
                      });
                    }}
                  >
                    {renderSecret.map((phrase, index) => {
                      return (
                        <Card className="w-[23.5%] m-1" key={index}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base font-semibold">
                              {phrase}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <>
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    About Our Wallet
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {WALLET_ABOUT_DESC}
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Created By</h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Developed by the 0xSK, a blockchain enthusiasts.
                  </p>
                </section>
              </>
            )}

            <div className={`pt-4 ${!renderWallet && "border-t"}`}>
              <h2 className="text-xl font-semibold mb-4">
                {renderWallet ? "Your Wallet" : "Add Your Wallet"}
              </h2>
              <div className={`flex space-x-2`}>
                {renderWallet ? (
                  <Button
                    variant="destructive"
                    className="flex items-center space-x-2"
                  >
                    <DeleteIcon className="w-5 h-5" />
                    <span>Clear Wallets</span>
                  </Button>
                ) : (
                  <Input
                    type="text"
                    placeholder="Enter your secret phrase (or leave blank to generate)"
                    value={walletSecretPhrase}
                    onChange={(e) => {
                      setwalletSecratPhrase(e.target.value);
                    }}
                    className="flex-grow"
                  />
                )}

                <Button
                  onClick={() => {
                    handleAddWallet();
                    toast({
                      title: "Wallet Created",
                    });
                  }}
                  className="flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>
                    {walletSecretPhrase ? "Add Wallet" : "Generate Wallet"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
          {renderWallet && <WalletDetails secretPhrase={renderSecret} />}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
