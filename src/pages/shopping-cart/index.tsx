
import { AppLayout } from '@/components/AppLayout/AppLayout'
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { CartItem } from '@/interfaces/CartItem';
import '@/styles/globals.css'
import { useEffect, useState } from 'react';


const ShoppingCartPage = () => {

    const [cart, setCart] = useState<CartItem[]>([])

    // Load cart data from localStorage when the component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        setCart(savedCart);
    }, []);

    return (
        <AppLayout>
            <ShoppingCart cart={cart} />
        </AppLayout>
    );
};

export default ShoppingCartPage
