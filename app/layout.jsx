import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Pixelweb AI",
  description: "Website Generator AI",
};

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
