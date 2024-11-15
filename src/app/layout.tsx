import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueueProvider from "@src/contexts/queue-context";
import Navbar from "@src/components/navbar";
import "react-datepicker/dist/react-datepicker.css";

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

export const metadata: Metadata = {
  title: "The Aggregate CMS",
  description: "The Aggregate content enrichment platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <Navbar />
        <div className="flex-grow overflow-hidden p-2">
          <QueueProvider>{children}</QueueProvider>
        </div>
      </body>
    </html>
  );
}
