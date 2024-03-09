import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav, NavLink } from "@/components/ui/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Datepicker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-svh flex-col justify-between">
          <Nav>
            <NavLink href="/">Home</NavLink>
          </Nav>
          {children}
          <footer>
            This is the footer!
          </footer>
        </main>
      </body>
    </html>
  );
}
