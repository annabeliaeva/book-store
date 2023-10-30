import Link from "next/link";
import { Col, Container, Image } from "react-bootstrap";
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
                    <Container className={`${styles.list_el} `}>
                        <Col>
                            <Image className={styles.img_cover} src={book.cover} />
                        </Col>
                        <Col>
                            <Link href={`/book/${book.id}`} className={styles.bookLink}>
                                <Container className={`flex-col ${styles.texts_container}`}>
                                    <div className={styles.price_text}>{book.price} р.</div>
                                    <div className={styles.price_text}><b>{book.title}</b></div>
                                    <div className={styles.price_text}>{book.author}</div>
                                </Container>
                            </Link>
                        </Col>
                    </Container>
                </Col>
            ))}
        </Container>
    )
}

export default BookList