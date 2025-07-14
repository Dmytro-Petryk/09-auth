import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Create, manage and explore your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'Create, manage and explore your notes',
    url: 'https://your-deployed-url.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
