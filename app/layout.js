import { Oswald, Roboto } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  display: "swap",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "F1 Tracker",
  description: "All the latest info to stay up to date with F1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${roboto.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          {/* <Sidebar /> */}
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
