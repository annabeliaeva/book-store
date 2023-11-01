import Link from "next/link";
import { Button, Col, Container, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import styles from './BookList.module.css'
import { BooksList } from "@/interfaces/BooksList";
import { useEffect, useState } from "react"
import { BookInShoppingCart } from "@/interfaces/BookInShoppingCart";

interface Props {
    data: BooksList[]
}
const BookList = (props: Props) => {

    const { data } = props

    const initialCartCount = Array(props.data.length).fill(0)

    const [cartCount, setCartCount] = useState(initialCartCount)

    const [cart, setCart] = useState<BookInShoppingCart[]>([]);

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
        const updatedCartCounts = [...cartCount]; // Create a copy of the cartCounts array
        updatedCartCounts[index]++; // Increment the count for the selected book
        setCartCount(updatedCartCounts); // Update the state with the new counts

        const bookForCart: BookInShoppingCart = {
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            price: book.price,
            quantity: 0,
            total: 0
        }
        setCart([...cart, bookForCart]);
    };

    const handlePlusCount = (index: number, book: BooksList) => {
        const updatedCartCounts = [...cartCount]; // Create a copy of the cartCounts array
        updatedCartCounts[index]++; // Increment the count for the selected book
        setCartCount(updatedCartCounts); // Update the state with the new counts

        const bookForCart: BookInShoppingCart = {
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            price: book.price,
            quantity: 0,
            total: 0
        }
        setCart([...cart, bookForCart]);

    }

    const handleMinusCount = (index: number) => {
        const updatedCartCounts = [...cartCount]; // Create a copy of the cartCounts array
        if (updatedCartCounts[index] > 0)
            updatedCartCounts[index]--; // Increment the count for the selected book
        setCartCount(updatedCartCounts); // Update the state with the new counts
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

                                {cartCount[index] > 0 ? ( // Check if cart count is more than 1
                                    <Container className="flex-row">
                                        <InputGroup className={styles.count_btns_group}>
                                            <Button variant='light_green' onClick={() => handleMinusCount(index)} className={styles.plus_button}>-
                                            </Button>
                                            <FormControl
                                                readOnly
                                                value={cartCount[index] + " шт."}
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
