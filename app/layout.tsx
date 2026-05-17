import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Report a Bug - Team 6",
  description:
    "Public bug report form for the TCSS 460 Team 6 API. No account required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}