"use client";

import localFont from "next/font/local";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import "./globals.css";
import { useRef } from "react";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={storeRef.current}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
