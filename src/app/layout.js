import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Admin Access Only",
};

export default function RootLayout({ children }) {
  const key = Math.round(Math.random() * 999999999000);

  return (
    <html lang="en">
      <body className="dark:bg-black bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Nav key={key}/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
