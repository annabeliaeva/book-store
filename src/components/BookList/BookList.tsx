import Link from 'next/link'; // Для создания ссылок между страницами
import styles from './BookList.module.css'; // Импортируем стили
import booksData from '../../data/books.json'; // Импортируем данные о книгах
import { Col, Container, Image, Row } from 'react-bootstrap'; // Импортируем компоненты react-bootstrap
import '@/styles/globals.css'
import { AppLayout } from '../AppLayout/AppLayout';

const BookList = () => {
  return (
    <AppLayout>

      <div className={styles.bookList}>
        <h2 className={styles.header}>Популярные книги</h2>
        <Container className={`row ${styles.table}`}>
          {booksData.map((book, index) => (
            <Col key={index} className='col-md-3 mb-4'>
              <Container className={`${styles.list_el} `}>
                <Col>
                  <Image className={styles.img_cover} src={book.cover} />
                </Col>
                <Col>
                  <Link href={`/book/${book.id}`} className={styles.bookLink}>
                    <p><b>{book.title}</b></p>
                    <p>{book.author}</p>
                  </Link>
                </Col>
              </Container>
            </Col>
          ))}
        </Container>
      </div>
    </AppLayout>
  );
};

export default BookList;