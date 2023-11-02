import Link from "next/link";
import { Col, Container, Image } from "react-bootstrap";
import styles from './BookList.module.css'
import { BooksList } from "@/interfaces/BooksList";
import { useEffect, useState } from "react"
import { CartItem } from "@/interfaces/CartItem";
import BooksAmountBtns from "../BooksAmountBtns/BooksAmountBtns";

interface Props {
    data: BooksList[]
}

const BookList = (props: Props) => {

    const { data } = props

    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart data from localStorage when the component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        setCart(savedCart);
    }, []);

    // Save cart data to localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);


    const handleAddToCart = (book: BooksList) => {

        const existingItem = cart.find((item) => item?.book?.id === book.id);
        if (existingItem) {
            // If the book already exists in the cart, update the quantity
            existingItem.quantity += 1;
            setCart([...cart]);
        } else {
            // If the book is not in the cart, add a new item
            setCart([...cart, { book, quantity: 1 }]);
        }
    };

    const handleMinusCount = (book: BooksList) => {
        const existingItem = cart.find((item) => item.book.id === book.id);
        if (existingItem) {
            existingItem.quantity -= 1;
            if (existingItem.quantity === 0) {
                const updatedCart = cart.filter((item) => item.book.id !== book.id)
                console.log(updatedCart)
                setCart([...updatedCart]);
            } else
                setCart([...cart]);
        }
    }

    const findBookInCartById = (book: BooksList) => {
        return cart.find((item) => item.book.id === book.id)
    }


    return (
        <Container className={`row ${styles.table}`}>
            {data.map((book, index) => (
                <Col key={index} className='col-md-3 mb-4'>
                    <Container className={`${styles.list_el} flex-col`}>
                        <Col>
                            <Image className='img_cover' src={book.cover} />
                        </Col>
                        <Col>
                            <Link href={`/book/${book.id}`} className={styles.bookLink}>
                                <Container className={`flex-col ${styles.texts_container}`}>
                                    <div className={styles.book_attr_text}>{book.price} ₽</div>
                                    <div className={styles.book_attr_text}><b>{book.title}</b></div>
                                    <div className={styles.book_attr_text}>{book.author}</div>
                                </Container>
                            </Link>
                        </Col>
                        <BooksAmountBtns cart={cart}
                            findBookInCartById={findBookInCartById}
                            handleAddToCart={handleAddToCart}
                            handleMinusCount={handleMinusCount}
                            book={book} />
                    </Container>
                </Col>
            ))}
        </Container>
    )
}

export default BookList
