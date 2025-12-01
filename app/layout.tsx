import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/components/ThirdwebProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Launch - Create Your Token",
  description: "Create your own token on Base in seconds",
  openGraph: {
    title: "Launch - Create Your Token",
    description: "Create your own token on Base in seconds",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:miniapp" content="true" />
        <meta property="fc:miniapp:name" content="Launch" />
        <meta property="fc:miniapp:icon" content="/icon.png" />
        <meta property="fc:miniapp:description" content="Create your own token" />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
