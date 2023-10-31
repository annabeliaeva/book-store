import Link from "next/link";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import styles from './BookList.module.css'
import { BooksList } from "@/interfaces/BooksList";

interface Props {
    data: BooksList[]
}
const BookList = (props: Props) => {

    const { data } = props

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
                                <Button
                                    variant='button_color'
                                    className={styles.add_to_cart_button}>В корзину</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            ))}
        </Container>
    )
}

export default BookList