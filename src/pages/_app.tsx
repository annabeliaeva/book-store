import { AuthProvider } from '@/components/AuthProvider';
import Meta from '@/components/Meta/Meta';
import '@/styles/custom.scss'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Meta />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
