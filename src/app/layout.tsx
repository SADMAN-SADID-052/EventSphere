import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "EventSphere",
  description: "Discover and manage events near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0f] text-white">
        <Navbar />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#13131a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#605DFF",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#E85D24",
                secondary: "#fff",
              },
            },
          }}
        />

        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
