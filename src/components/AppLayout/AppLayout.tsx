// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '@/components/Header/Header'
import { ReactNode } from 'react';

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