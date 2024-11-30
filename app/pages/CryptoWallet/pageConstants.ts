import { CryptoOption } from "@/interface/index.exports";

export const fromMintAddress = "So11111111111111111111111111111111111111112";

export const cryptoOptions: CryptoOption[] = [
  {
    value: "BTC",
    label: "Bitcoin (BTC)",
    mintAddress: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    tokenConversion: 100000000,
  },
  {
    value: "ETH",
    label: "Ethereum (ETH)",
    mintAddress: "2kaRSuDcz1V1kqq1sDmP23Wy98jutHQQgr5fGDWRpump",
    tokenConversion: 1000000000000000000,
  },
  {
    value: "USDT",
    label: "Tether (USDT)",
    mintAddress: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
    tokenConversion: 1000000,
  },
  {
    value: "BNB",
    label: "Binance Coin (BNB)",
    mintAddress: "9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa",
    tokenConversion: 10000000,
  },
  {
    value: "XRP",
    label: "Ripple (XRP)",
    mintAddress: "5p8eLotpXynvqogceN8wMN6Yh3NE2oWCfV8kMhVVR9DD",
    tokenConversion: 1000000,
  },
  {
    value: "USDC",
    label: "USDC",
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    tokenConversion: 1000000,
  },
];
