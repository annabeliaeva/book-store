
import { CartItem } from "@/interfaces/CartItem"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import style from './ShoppingCart.module.css'
import BooksAmountBtns from "../BooksAmountBtns/BooksAmountBtns"
import { BooksList } from "@/interfaces/BooksList"
import { useEffect, useState } from "react"
import { formatNumberWithSpace } from "@/data/functions"

interface Props {
    cart: CartItem[]
}



const ShoppingCart = (props: Props) => {

    const countTotalPrice = () => {
        return cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

    }

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
        <Container className={`flex-col`}>
            <Row>
                <h2 className={style.header_text}>Корзина</h2>
            </Row>
            <Row>
                <Container className={style.cart_table}>
                    {cart.map((item: CartItem) => (
                        <Container className={style.book_item} key={item.book?.id}>
                            <Col>
                                <Image className={style.cover} src={item.book.cover}>
                                </Image>
                            </Col>
                            <Col>
                                <Row className='font_weight_500'>
                                    {item.book?.title}
                                </Row>
                                <Row>
                                    {item.book?.author}
                                </Row>
                            </Col>
                            <Col className='flex-row flex-start flex-align-center'>
                                <BooksAmountBtns book={item?.book}
                                    cart={cart}
                                    findBookInCartById={findBookInCartById}
                                    handleAddToCart={handleAddToCart}
                                    handleMinusCount={handleMinusCount} />
                                <span >
                                    <span className='font_weight_400'>✕</span>
                                    <span className='font_weight_400'> {formatNumberWithSpace(item.book.price)} ₽</span>
                                </span>
                            </Col>
                        </Container>
                    ))}
                </Container>
            </Row>
            <Row className='flex-center'>
                <h1 className={style.border}>
                </h1>
            </Row>
            <Row>
                <Col className={style.total_text}>
                    <span className='font_weight_500'>Товары </span>
                </Col>
                <Col className={style.total_text}>
                    <span className='font_weight_500'>{formatNumberWithSpace(countTotalPrice())} ₽</span>
                </Col>
            </Row>
            <Row className='flex-center'>
                <Button className={style.order_btn} variant='light_green'>Перейти к оформлению</Button>
            </Row>
        </Container>
    )
}

export default ShoppingCart