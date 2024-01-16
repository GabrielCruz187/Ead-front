import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onebitflix",
  icons: "./favicon.svg",
  description: "Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil.",
  openGraph: {
    title: "Onebitflix",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
