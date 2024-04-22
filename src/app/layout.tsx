import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Contacts",
  description: "Seu gerenciador de contatos favorito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        {children}</body>
    </html>
  );
}
