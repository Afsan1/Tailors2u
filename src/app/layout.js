import {ClerkProvider} from "@clerk/nextjs";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montenegrinGothic = { variable: '--font-gothic' };

export const metadata = {
  title: "Tailors2U | Bespoke Doorstep Tailoring & Premium Alterations",
  description: "Experience luxury bespoke tailoring at your doorstep. We offer standard, premium, and luxury tailored garments and custom alterations for shirts, pants, and kurtas.",
  keywords: "tailor, doorstep tailoring, custom alterations, shirts, pants, kurtas, premium fabrics, linen, cotton, luxury tailor",
  icons: {
    icon: [
      { url: '/brand-icon.png', sizes: 'any' },
      { url: '/brand-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/brand-icon.png',
    apple: '/brand-icon.png',
  },
  openGraph: {
    title: "Tailors2U | Bespoke Doorstep Tailoring & Premium Alterations",
    description: "Experience luxury bespoke tailoring at your doorstep. We offer standard, premium, and luxury tailored garments and custom alterations for shirts, pants, and kurtas.",
    url: "https://tailors2u.com",
    siteName: "Tailors2U",
    images: [
      {
        url: "/brand-icon.png",
        width: 800,
        height: 800,
        alt: "Tailors2U Brand Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tailors2U | Bespoke Doorstep Tailoring",
    description: "Experience luxury bespoke tailoring at your doorstep.",
    images: ["/brand-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>
        <ClerkProvider
          appearance={{
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
          }}
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}