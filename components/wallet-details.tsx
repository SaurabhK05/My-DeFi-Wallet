"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Copy, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppSelector } from "@/lib/hooks";

export function WalletDetails() {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const walletSecret = useAppSelector((state: any) => state.wallet);

  const walletDetails = {
    name: "My DeFi Wallet",
    publicKey: walletSecret.publicKey,
    privateKey: walletSecret.privateKey,
    secretPhrase:
      "witch collapse practice feed shame open despair creek road again ice least",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd want to show a toast notification here
    console.log("'Copied to clipboard'");
  };

  return (
    <div className=" bg-white p-4 md:p-8 dark:bg-zinc-950 rounded-2xl">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Wallet Details</CardTitle>
          <CardDescription>
            View and manage your wallet information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Never share your private key or secret phrase with anyone.
              Displaying them here is for demonstration purposes only and is not
              secure.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {walletDetails.name}
              </h2>
            </div>

            <div>
              <Label htmlFor="public-key" className="text-base font-semibold">
                Public Key
              </Label>
              <div className="flex">
                <Input
                  id="public-key"
                  value={walletDetails.publicKey}
                  readOnly
                  className="flex-grow"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => copyToClipboard(walletDetails.publicKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="private-key" className="text-base font-semibold">
                Private Key
              </Label>
              <div className="flex">
                <Input
                  id="private-key"
                  type={showPrivateKey ? "text" : "password"}
                  value={walletDetails.privateKey}
                  readOnly
                  className="flex-grow"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => copyToClipboard(walletDetails.privateKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label
                htmlFor="secret-phrase"
                className="text-base font-semibold"
              >
                Secret Recovery Phrase
              </Label>
              <div className="flex">
                <Input
                  id="secret-phrase"
                  type={showSecretPhrase ? "text" : "password"}
                  value={walletDetails.secretPhrase}
                  readOnly
                  className="flex-grow"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => setShowSecretPhrase(!showSecretPhrase)}
                >
                  {showSecretPhrase ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => copyToClipboard(walletDetails.secretPhrase)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
