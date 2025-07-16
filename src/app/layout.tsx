import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Primeflix - Movies",
  description: "Site de filmes",
  openGraph: {
    title: "Primeflix - Movies",
    description: "Descubra os melhores filmes!",
    url: "https://primeflixnext.vercel.app/",
    siteName: "Primeflix",
    images: [
      {
        url: "https://primeflixnext.vercel.app/imagem.jpg", // URL da imagem
        width: 1200,
        height: 630,
        alt: "Banner do Primeflix",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bt-pt">
      <body className="min-h-screen flex flex-col ">
        <Toaster
          position="bottom-right"
          duration={2500}
          toastOptions={{
            style: {
              background: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              borderColor: "#333",
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
