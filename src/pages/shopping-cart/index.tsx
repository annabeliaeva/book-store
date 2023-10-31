
import { AppLayout } from '@/components/AppLayout/AppLayout'
import BookList from '@/components/BookList/BookList';
import '@/styles/globals.css'
import Link from 'next/link';

const ShoppingCart = () => {

    return (
        <AppLayout>
            <div>
                <h2>Shopping Cart</h2>
                <Link href="/catalog">Go back to Catalog</Link>
            </div>

        </AppLayout>
    );
};

export default ShoppingCart;
