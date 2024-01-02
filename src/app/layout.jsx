import { Inter } from "next/font/google";
import "./globals.css";
import { AuthUserProvider } from "@/firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Todo App made with Next.js and Firebase",
  image: "/images/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthUserProvider>{children}</AuthUserProvider>
      </body>
    </html>
  );
}
