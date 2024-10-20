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
import { useToast } from "@/hooks/use-toast";
import { WALLET_ALERT_DESC } from "@/constants/wallet/pageConstant";

export function WalletDetails(props: { secretPhrase: string[] }) {
  const { secretPhrase } = props;

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const walletSecret = useAppSelector((state) => state.wallet);
  const { toast } = useToast();

  const walletDetails = {
    name: "My DeFi Wallet",
    publicKey: walletSecret.publicKey,
    privateKey: walletSecret.privateKey,
    secretPhrase: secretPhrase.join(" "),
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <AlertDescription>{WALLET_ALERT_DESC}</AlertDescription>
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
                  onClick={() => {
                    toast({
                      title: "Public Key Copied",
                    });
                    copyToClipboard(walletDetails.publicKey);
                  }}
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
                  onClick={() => {
                    copyToClipboard(walletDetails.privateKey);
                    toast({
                      title: "Private Key Copied",
                    });
                  }}
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
                  onClick={() => {
                    toast({
                      title: "Secret Phrase Copied",
                    });
                    copyToClipboard(walletDetails.secretPhrase);
                  }}
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
