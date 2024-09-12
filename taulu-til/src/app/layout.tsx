import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "./SessionContext";
import { validateRequest } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taulu Til",
  description: "Discover the Karachay-Balkar Language",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider value={session}>
          <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-50">
              <Navbar />
            </div>
            <div className="grow">
              {children}
              <Toaster richColors />
            </div>
            <div className="sticky bottom-0 z-50">
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
