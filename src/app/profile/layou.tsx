import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";



export const metadata: Metadata = {
  title: "Onebitflix - Meus Dados",
  icons: "./favicon.svg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
