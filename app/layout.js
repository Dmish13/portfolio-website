import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500","600","700"]
});

const ovo = Ovo({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Daniel Misherky's Portfolio",
  description: "Collection of Daniel's projects and experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
