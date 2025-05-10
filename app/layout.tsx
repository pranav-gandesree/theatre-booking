import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { DataProvider } from "@/context/DataContext"
import { Toaster } from "@/components/ui/toaster"



const inter = Inter({ subsets: ["latin"] })

  export const metadata: Metadata = {
    title: "yovanAV | Premium Home Theatre Booking",
    description: "Book your private cinema experience for any occasion",
    icons: {
      icon: "/logo.png",
    },
  }


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Header />

            <DataProvider>
              {/* <BookingProvider> */}
                <main className="flex-1">{children}</main>
                <Toaster /> 
              {/* </BookingProvider> */}
            </DataProvider>
            
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
