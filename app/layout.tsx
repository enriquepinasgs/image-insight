import Footer from "@/components/footer";
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImageInsight",
  description:
    "Discover ImageInsight, the versatile API that analyzes images to generate detailed captions, descriptions, and primary color palettes. Choose output in English or Spanish for seamless integration into your applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("overflow-auto relative", inter.className)}>
        <ReactQueryProvider>
          {children}
          <Footer classname="absolute bottom-0 right-0 mr-2" />
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
