import type { Metadata, Viewport } from "next";
import "@/globals.css";
import { Header } from "@/components/Header";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/ToastProvider";
import { UserContextProvider } from "@/context/UserContext";
import { UIProvider } from "@/context/UIContext"


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2D5A27',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://yosemite-reservations.vercel.app'),
  
  title: "Yosemite Reservations",
  description: "Book and manage your Yosemite National Park adventure with ease.",
  
  icons: {
    icon: '/YosemiteIcon.png',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'Yosemite Reservations',
    description: 'Explore Yosemite and secure your spot in the heart of the Sierras.',
    siteName: 'Yosemite Reservations',
    images: [
      {
        url: '/YosemitePreview.png',
        width: 1200, 
        height: 800, 
        alt: 'Yosemite National Park Landscape',
      }
    ],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <UserContextProvider>
          <UIProvider>
            <Header />
            <div
              className="background-layout"
              style={{ 
                backgroundImage: "url('/YosemiteBackground.png')",
                backgroundRepeat: "repeat-y",
                backgroundSize: "100% auto",
                backgroundPosition: "top center",
              }}
            >
              <main className="w-full">
                {children}
              </main>
            </div>
            <ToastProvider /> 
          </UIProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
