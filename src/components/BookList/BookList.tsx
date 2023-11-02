import Link from "next/link";
import { Button, Col, Container, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import styles from './BookList.module.css'
import { BooksList } from "@/interfaces/BooksList";
import { useEffect, useState } from "react"
import { CartItem } from "@/interfaces/CartItem";

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


    const handleAddToCart = (index: number, book: BooksList) => {

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

    const handlePlusCount = (index: number, book: BooksList) => {
        const existingItem = cart.find((item) => item.book.id === book.id);
        if (existingItem) {
            // If the book already exists in the cart, update the quantity
            existingItem.quantity += 1;
            setCart([...cart]);
        } else {
            // If the book is not in the cart, add a new item
            setCart([...cart, { book, quantity: 1 }]);
        }

    }

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
                            <Image className={styles.img_cover} src={book.cover} />
                        </Col>
                        <Col>
                            <Link href={`/book/${book.id}`} className={styles.bookLink}>
                                <Container className={`flex-col ${styles.texts_container}`}>
                                    <div className={styles.book_attr_text}>{book.price} р.</div>
                                    <div className={styles.book_attr_text}><b>{book.title}</b></div>
                                    <div className={styles.book_attr_text}>{book.author}</div>
                                </Container>
                            </Link>
                        </Col>
                        <Row>
                            <Col className="align-items-end ">
                                {cart.find((item) => item.book.id === book.id)?.quantity != undefined ? ( // Check if cart count is more than 1
                                    <Container className="flex-row">
                                        <InputGroup className={styles.count_btns_group}>
                                            <Button variant='light_green' onClick={() => handleMinusCount(book)} className={styles.plus_button}>-
                                            </Button>
                                            <FormControl
                                                readOnly
                                                value={findBookInCartById(book)?.quantity + " шт."}
                                                className={`cart-count-field ${styles.form_control}`}
                                                aria-label="Cart Count"
                                            />
                                            <Button variant='light_green' onClick={() => handlePlusCount(index, book)} className={styles.plus_button}>+
                                            </Button>
                                        </InputGroup>
                                    </Container>
                                ) : (
                                    <Button
                                        onClick={() => handleAddToCart(index, book)}
                                        variant='secondary'
                                        className={styles.add_to_cart_button}> В корзину
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            ))}
        </Container>
    )
}

export default BookList
