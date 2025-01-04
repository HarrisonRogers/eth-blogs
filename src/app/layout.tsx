import type { Metadata } from 'next';
import { Roboto, Sixtyfour, Oswald } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Container from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Ethereum Blogs',
  description: 'Ethereum Blogs',
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const sixtyfour = Sixtyfour({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sixtyfour',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '400', '600'],
  variable: '--font-oswald',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${sixtyfour.variable} ${oswald.variable} antialiased flex flex-col items-center justify-center text-center h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3Provider>
            <Container className="items-center justify-center">
              <Navbar />
              {children}
            </Container>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
