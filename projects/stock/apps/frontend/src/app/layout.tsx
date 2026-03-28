import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import 'flatpickr/dist/flatpickr.css';

import StyledComponentsRegistry from '@src/components/AntdRegistry';
import App from '@src/components/App';
import { Noto_Sans_Mende_Kikakui } from 'next/font/google';

const inter = Noto_Sans_Mende_Kikakui({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});
// export const metadata: Metadata = {
//   title: 'Meta',
//   description: 'Meta',
// };

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <title>Meta v0.0.1</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        />
        <link rel="icon" href="/logo-symbol.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <App> {children}</App>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
