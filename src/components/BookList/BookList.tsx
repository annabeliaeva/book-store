import Link from 'next/link'; // Для создания ссылок между страницами
import styles from './BookList.module.css'; // Импортируем стили
import booksData from '../../data/books.json'; // Импортируем данные о книгах
import { Col, Container, Image } from 'react-bootstrap'; // Импортируем компоненты react-bootstrap
import '@/styles/globals.css'

const BookList = () => {
  return (
    <div className={styles.bookList}>
      <h2 className={styles.header}>Список книг</h2>
      {booksData.map((book) => (
        <Col key={book.id}>
          <Container className={`${styles.list_el} flex_direction_row`}>
            <Col>
              <Image className={styles.img_cover} src={book.cover} />
            </Col>
            <Col>
              <Link href={`/book/${book.id}`} className={styles.bookLink}>
                <h3>{book.title}</h3>
                <p>Автор: {book.author}</p>
                <p>Описание : {book.description}</p>
              </Link>
            </Col>
          </Container>
          {/* Ссылка на страницу с детальной информацией о книге */}
        </Col>
      ))}
    </div>
  );
};

export default BookList;