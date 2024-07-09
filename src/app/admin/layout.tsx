import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "../globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel-layout";
import { ContentLayout } from "@/components/content-layout";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"
import { redirect } from "next/navigation";
import { NextAuthProvider } from "../auth-provider";
import QueryClientContextProvider from "../QueryClientContextProvider";

export const metadata: Metadata =
{
  title: "David Silwal"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>
            <NextAuthProvider>
              <QueryClientContextProvider>
                <ContentLayout children={children} >
                </ContentLayout>
              </QueryClientContextProvider>
            </NextAuthProvider>
          </AdminPanelLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}


