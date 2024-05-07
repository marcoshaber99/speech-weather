import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HaberWeather",
  description: "The best way to get weather updates using your voice.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/cloud.svg",
        href: "/cloud.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/cloud-dark.svg",
        href: "/cloud-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="weather-theme"
          >
            <Toaster position="top-right" />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
