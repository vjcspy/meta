// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import DefaultLayout from '../components/Layouts/DefaultLayout';
import store from '../store/index';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
    P,
    IP
> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout =
        Component.getLayout ??
        ((page) => <DefaultLayout>{page}</DefaultLayout>);

    return (
        <Provider store={store}>
            <Head>
                <title>Meta v0.0.1</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content="Meta" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
};
export default App;
