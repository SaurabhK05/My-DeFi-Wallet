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

const cryptoOptions = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "USDT", label: "Tether (USDT)" },
  { value: "BNB", label: "Binance Coin (BNB)" },
  { value: "XRP", label: "Ripple (XRP)" },
];

export function CryptoSwap() {
  const [fromCrypto, setFromCrypto] = useState("");
  const [toCrypto, setToCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [estimatedReceived, setEstimatedReceived] = useState("0");

  const handleSwap = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    // In a real application, you would call an API to get the actual exchange rate
    // This is a simplified example
    const mockExchangeRate = 1.5;
    setEstimatedReceived((parseFloat(value) * mockExchangeRate).toFixed(6));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCrypto || !toCrypto || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically integrate with a cryptocurrency exchange API
    // For this example, we'll just show a success message
    toast({
      title: "Swap Initiated",
      description: `Swapping ${amount} ${fromCrypto} to approximately ${estimatedReceived} ${toCrypto}`,
    });

    // Reset form
    setFromCrypto("");
    setToCrypto("");
    setAmount("");
    setEstimatedReceived("0");
  };

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
                onClick={handleSwap}
              >
                <ArrowDownUp className="h-4 w-4" />
                <span className="sr-only">Swap currencies</span>
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="toCrypto">To</Label>
              <Select value={toCrypto} onValueChange={setToCrypto}>
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
            setEstimatedReceived("0");
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Swap</Button>
      </CardFooter>
    </Card>
  );
}
