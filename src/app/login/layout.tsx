import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@/providers/theme-provider";
import { ContentLayout } from "@/components/content-layout";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"
import { NextAuthProvider } from "../auth-provider";
import QueryClientContextProvider from "../QueryClientContextProvider";

import "../globals.css";

export const metadata: Metadata =
{
    title: "David Silwal"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={GeistSans.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <NextAuthProvider>
                        <QueryClientContextProvider>
                            <ContentLayout children={children} >
                            </ContentLayout>
                        </QueryClientContextProvider>
                    </NextAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}


