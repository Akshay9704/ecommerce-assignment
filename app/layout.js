import { Inter } from "next/font/google";
import "./globals.css";
import ProductContextProvider from "@/context/ProductContextProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce-Assignment",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ProductContextProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </ProductContextProvider>
    </html>
  );
}
