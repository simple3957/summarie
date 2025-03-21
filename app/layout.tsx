import type { Metadata } from "next";
import { Source_Sans_3 as FontSans} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";  

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});



export const metadata: Metadata = {
  title: "Summmaire",
  description: "Summaire is an app for summarizing pdfs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body >
        <div className="relative flex flex-col min-h-screen ">
          <Header/>
          <main className="flex-1">{children}</main>
        </div> 
      </body>
      
    </html>
    </ClerkProvider>
  );
}
