// import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Header = dynamic(
    () => import('@/components/Header/Header'),
    { ssr: false }
)

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className='main bg-light_background'>
            <Header />
            {children}
        </div>
    )
}