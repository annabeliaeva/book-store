
import { AppLayout } from '@/components/AppLayout/AppLayout'
import { CartItem } from '@/interfaces/CartItem';
import '@/styles/globals.css'
import { useEffect, useState } from 'react';


const ShoppingCart = () => {

    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart data from localStorage when the component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        setCart(savedCart);
    }, []);

    return (
        <AppLayout>
            <div>
                <h2>Shopping Cart</h2>
                {cart.map((item) => (
                    <li key={item.book?.id}>
                        {item.book?.title} - ${item.book?.price} (Quantity: {item.quantity})
                    </li>
                ))}
            </div>


        </AppLayout>
    );
};

export default ShoppingCart;
