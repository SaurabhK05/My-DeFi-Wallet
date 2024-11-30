"use client";

import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ToolTip } from "@/components/ToolTip/ToolTip";
import { cryptoOptions, fromMintAddress } from "./pageConstants";
import axios, { AxiosError } from "axios";
import { CryptoOption } from "@/interface/index.exports";
import { LAMPORTS_PER_SOL, VersionedTransaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type ErrorResponse = {
  error: string;
};

export function CryptoSwap() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [fromCrypto, setFromCrypto] = useState("Solana");
  const [toCrypto, setToCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [quoteReceived, setQuoteReceived] = useState();
  const [estimatedReceived, setEstimatedReceived] = useState<string>();

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCrypto || !toCrypto || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Ensure wallet is connected
      if (!wallet || !wallet.connected) {
        throw new Error("Wallet is not connected");
      }

      const {
        data: { swapTransaction },
      } = await axios.post("https://quote-api.jup.ag/v6/swap", {
        quoteResponse: quoteReceived,
        userPublicKey: wallet?.publicKey?.toString(),
      });

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // Ensure signTransaction method is available
      if (!wallet.signTransaction) {
        throw new Error("Wallet does not support signing transactions");
      }

      const signedTransaction = await wallet.signTransaction(transaction);
      const latestBlockHash = await connection.getLatestBlockhash();

      // Execute the transaction
      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      toast({
        title: "Swap Failed",
        description: (axiosError.response?.data as ErrorResponse).error,
        variant: "destructive",
      });
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${amount} ${fromCrypto} to approximately ${estimatedReceived} ${toCrypto}`,
    });
  };

  async function getTokenQuote(val: string) {
    setToCrypto(val);

    const selectedToken: CryptoOption | undefined = cryptoOptions.find(
      (token: CryptoOption) => token.value === val
    );

    try {
      if (selectedToken) {
        const { data: quoteResponse } = await axios.get(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromMintAddress}&outputMint=${
            selectedToken?.mintAddress
          }&amount=${LAMPORTS_PER_SOL * Number(amount)}&slippageBps=50`
        );

        setQuoteReceived(quoteResponse);
        setEstimatedReceived(
          (
            parseInt(quoteResponse.outAmount) / selectedToken?.tokenConversion
          ).toFixed(2)
        );
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      toast({
        title: "Quote Request Failed",
        description: (axiosError.response?.data as ErrorResponse).error,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Swap Crypto</CardTitle>
        <CardDescription>
          Exchange one cryptocurrency for another.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="fromCrypto">From</Label>
            {/* TODO: Implement in Future */}
            {/* <div className="flex flex-col space-y-1.5">
                <Select value={fromCrypto} onValueChange={setFromCrypto}>
                  <SelectTrigger id="fromCrypto">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {cryptoOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                // onClick={handleSwap}
              >
                <ArrowDownUp className="h-4 w-4" />
                <span className="sr-only">Swap currencies</span>
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="toCrypto">To</Label>
              <Select
                value={toCrypto}
                onValueChange={(val) => getTokenQuote(val)}
              >
                <SelectTrigger id="toCrypto">
                  <SelectValue placeholder="Select cryptocurrency" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {cryptoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="estimatedReceived">Estimated Received</Label>
              <Input
                id="estimatedReceived"
                type="text"
                value={estimatedReceived}
                readOnly
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setFromCrypto("");
            setToCrypto("");
            setAmount("");
            setEstimatedReceived("0.00");
          }}
        >
          Reset
        </Button>
        <ToolTip
          buttonTitle="Swap"
          tooltipContent="By default slippage is 0.5%"
          onClick={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
}
