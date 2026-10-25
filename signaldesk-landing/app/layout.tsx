import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalDesk AI — Turn incidents into clear next steps",
  description:
    "An intelligent issue triage assistant that classifies incidents, finds similar cases, and surfaces troubleshooting guidance for human review.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
