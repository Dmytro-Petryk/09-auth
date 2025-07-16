import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <head />
      <body>
        <AuthProvider>
          <TanStackProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
