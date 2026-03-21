import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ProcurementProvider } from "@/context/ProcurementContext";
import { ToastOverlay } from "@/components/ToastOverlay";
import { RoleGuard } from "@/components/RoleGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Procurement Dashboard",
  description: "A clean, minimal, and scalable frontend starter project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex h-screen overflow-hidden bg-[#0d0d0f] text-white font-sans antialiased">
        <ProcurementProvider>
          <ToastOverlay />
          <div className="flex-1 flex flex-col h-full animate-fade-in">
            {children}
          </div>
        </ProcurementProvider>
      </body>
    </html>
  );
}
