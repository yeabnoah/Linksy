import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import QueryProviderComponent from "@/hooks/QueryProvider";
import { ThemeProvider } from "@/hooks/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "the Bookmark",
  description: "Your digital knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <QueryProviderComponent>
        <body className={`${spaceGrotesk.className} `}>
          <ThemeProvider attribute="class" defaultTheme="" enableSystem>
            {children}{" "}
          </ThemeProvider>
        </body>
      </QueryProviderComponent>
    </html>
  );
}
