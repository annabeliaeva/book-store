import Meta from '@/components/Meta/Meta';
import '@/styles/custom.scss'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Meta />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
