import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Admin Access Only",
};

export default function RootLayout({ children }) {
  const key = Math.round(Math.random() * 999999999000);

  return (
    <html lang="en">
      <body className="bg-purple-300 min-h-screen">
        <Nav key={key}/>
        {children}
      </body>
    </html>
  );
}
