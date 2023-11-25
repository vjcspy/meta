import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';

import App from '@src/components/App';
import ThemeRegistry from '@src/components/ThemeRegistry/ThemeRegistry';
import type { Metadata } from 'next';

// const inter = Nunito({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Meta',
  description: 'Meta',
  icons: ['favicon.png'],
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <title>Meta v0.0.1</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <ThemeRegistry>
          <App> {children}</App>
        </ThemeRegistry>
      </body>
    </html>
  );
}
