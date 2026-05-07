import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mughal Sports Lahore — Premium Sports Equipment & School Supplies",
  description: "Mughal Sports Lahore is Pakistan's trusted sports shop supplying cricket, football, hockey, badminton equipment to schools, clubs and athletes across Lahore.",
  keywords: "sports shop Lahore, cricket equipment Lahore, football gear Pakistan, hockey sticks Lahore, school sports supplier, Mughal Sports, badminton rackets Lahore",
  openGraph: {
    title: "Mughal Sports Lahore",
    description: "Premium sports equipment for schools, clubs and athletes in Lahore, Pakistan.",
    type: "website",
    locale: "en_PK",
    siteName: "Mughal Sports Lahore",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
