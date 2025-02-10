import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/user.context";
import { ReduxProvider } from "@/store/provider";
import { Poppins } from "next/font/google";
import { Inter } from 'next/font/google'
import { NavBar } from "@/components/Navbar";
 
// If loading a variable font, you don't need to specify the font weight
const inter = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400', // Optional, defaults to '400'
})
 




const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Policy Sure",
  description: "An insurance platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark`}
      >
        <ReduxProvider>
          <NavBar/>
          {children}
          {/* <Toaster /> */}

        </ReduxProvider>
      </body>
    </html>
  );
}