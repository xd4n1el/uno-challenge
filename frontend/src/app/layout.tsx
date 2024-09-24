import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';

import { Providers } from '@/providers';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Uno | Challenge',
  description: 'By xd4n1el',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}

          <ToastContainer
            autoClose={5000}
            draggable={false}
            limit={5}
            closeOnClick
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            newestOnTop={false}
            position="bottom-right"
          />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
