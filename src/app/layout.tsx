import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel-layout";
import { ContentLayout } from "@/components/content-layout";
import { NextAuthProvider } from "./auth-provider";

export const metadata: Metadata =
{
  title: "David Silwal"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>
            <NextAuthProvider>
              <ContentLayout children={children} >
              </ContentLayout>
            </NextAuthProvider>
          </AdminPanelLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}


