import { BooksList } from "@/interfaces/BooksList"
import { CartItem } from "@/interfaces/CartItem"
import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap"
import styles from './BooksAmountBtns.module.css'
import { useEffect, useState } from "react"

interface Props {
    cart: CartItem[],
    book: BooksList,
    handleAddToCart: (book: BooksList) => void,
    handleMinusCount: (book: BooksList) => void,
    findBookInCartById: (book: BooksList) => CartItem | undefined,
}
const BooksAmountBtns = (props: Props) => {

    const { cart, book, handleAddToCart, handleMinusCount, findBookInCartById } = props

    return (
        <Row>
            <Col className={`align-items-end ${styles.main}`}>
                {cart.find((item) => item.book.id === book.id)?.quantity != undefined ? ( // Check if cart count is more than 1
                    <Container className={styles.count_btns_group}>
                        <Button variant='white' onClick={() => handleMinusCount(book)} className={styles.plus_button}>-
                        </Button>
                        <InputGroup className={styles.count_btns_group}>
                            <FormControl
                                readOnly
                                value={findBookInCartById(book)?.quantity}
                                className={`cart-count-field ${styles.form_control}`}
                                aria-label="Cart Count"
                            />
                        </InputGroup>
                        <Button variant='white' onClick={() => handleAddToCart(book)} className={styles.plus_button}>+
                        </Button>
                    </Container>
                ) : (
                    <Button
                        onClick={() => handleAddToCart(book)}
                        variant='secondary'
                        className={styles.add_to_cart_button}> В корзину
                    </Button>
                )}
            </Col>
        </Row>
    )
}

export default BooksAmountBtns