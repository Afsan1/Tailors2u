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

export const metadata = {
  title: "Tailors2U | Bespoke Doorstep Tailoring & Premium Alterations",
  description: "Experience luxury bespoke tailoring at your doorstep. We offer standard, premium, and luxury tailored garments and custom alterations for shirts, pants, and kurtas.",
  keywords: "tailor, doorstep tailoring, custom alterations, shirts, pants, kurtas, premium fabrics, linen, cotton, luxury tailor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#FFD9BE',
              colorBackground: '#0B3D2E',
              colorText: '#FFD9BE',
              colorTextSecondary: '#e2ece9',
              colorInputBackground: '#032a20',
              colorInputText: '#ffffff',
              borderRadius: '16px',
            },
            elements: {
              card: {
                backgroundColor: 'rgba(6, 78, 59, 0.45) !important',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              },
              headerTitle: {
                color: '#FFD9BE !important',
              },
              headerSubtitle: {
                color: '#e2ece9 !important',
              },
              formFieldLabel: {
                color: '#FFD9BE !important',
              },
              dividerText: {
                color: '#e2ece9 !important',
              },
              footerText: {
                color: '#e2ece9 !important',
              },
              footerActionText: {
                color: '#e2ece9 !important',
              },
              formButtonPrimary: {
                background: 'linear-gradient(120deg, #064e3b 0%, #0c614b 50%, #064e3b 100%) !important',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFD9BE !important',
                textTransform: 'none',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(120deg, #0c614b 0%, #10b981 50%, #0c614b 100%) !important',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                },
              },
              formFieldInput: {
                backgroundColor: '#032a20 !important',
                border: '1px solid rgba(255, 255, 255, 0.1) !important',
                color: '#ffffff !important',
                '&::placeholder': {
                  color: 'rgba(255, 217, 190, 0.5) !important',
                },
                '&:focus': {
                  borderColor: '#10b981 !important',
                  boxShadow: '0 0 0 1px #10b981 !important',
                }
              },
              footerActionLink: {
                color: '#FFD9BE !important',
                '&:hover': {
                  color: '#10b981 !important',
                }
              },
              socialButtonsBlockButton: {
                backgroundColor: '#032a20 !important',
                border: '1px solid rgba(255, 255, 255, 0.1) !important',
                color: '#ffffff !important',
                '&:hover': {
                  backgroundColor: '#064e3b !important',
                  borderColor: '#FFD9BE !important',
                }
              },
              socialButtonsBlockButtonText: {
                color: '#ffffff !important',
              },
            }
          }}
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}