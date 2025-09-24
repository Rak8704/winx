/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import ShadcnToastProvider from "./shadcn-toast-provider";
import GamesLoader from "./GamesLoader";
import { NotificationToaster } from "@/components/notifications/notification-toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Winxebet",
  description: "Bangladeshi 1No Betting Platform",
  icons: "./favicon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await auth();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="">
          <Suspense>
            <SessionProvider session={session}>
              <Toaster />
              <ShadcnToastProvider />
              <StoreProvider>
                <GamesLoader />
                {children}
                {session?.user && (
                  <NotificationToaster userId={session.user.id} />
                )}
              </StoreProvider>
            </SessionProvider>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
