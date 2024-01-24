import "bootstrap/dist/css/bootstrap.min.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onebitflix - Home",
  icons: "./favicon.svg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
