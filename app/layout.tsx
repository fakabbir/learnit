import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Script from "next/script";
import AuthProvider from "../context/AuthProvider";
import Navbar from "@/components/web/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classroom",
  description: "Learn and Earn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body>
          <main className={inter.className }>
            <nav className='border-b py-2'>
              <Navbar />
            </nav>
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
