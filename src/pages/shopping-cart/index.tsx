
import { AppLayout } from '@/components/AppLayout/AppLayout'
import { BookInShoppingCart } from '@/interfaces/BookInShoppingCart';
import '@/styles/globals.css'
import { useEffect, useState } from 'react';

interface ShoppingCartItem {
    book: BookInShoppingCart;
    quantity: number;
}


const ShoppingCart = () => {

    const [cart, setCart] = useState<BookInShoppingCart[]>([]);

    // Load cart data from localStorage when the component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        setCart(savedCart);
    }, []);

    const uniqueBooks: ShoppingCartItem[] = cart.reduce(
        (result, item) => {
            const existingItem = result.find((i) => i.book.id === item.id);
            if (!existingItem) {
                result.push({ book: item, quantity: 1 });
            } else {
                existingItem.quantity += 1;
            }
            return result;
        },
        [] as ShoppingCartItem[]
    );


    return (
        <AppLayout>
            <div>
                <h2>Shopping Cart</h2>
                {uniqueBooks.map((item) => (
                    <li key={item.book.id}>
                        {item.book.title} - ${item.book.price} (Quantity: {item.quantity})
                    </li>
                ))}
            </div>

        </AppLayout>
    );
};

export default ShoppingCart;
