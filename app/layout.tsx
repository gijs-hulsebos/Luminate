import type {Metadata} from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Luminate - Catholic Bible',
  description: 'A minimalist Catholic Bible Web App with Text-to-Speech',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id';

  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body className="font-sans bg-[#FCF9F2] text-[#1A1A1A] antialiased" suppressHydrationWarning>
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
