import styles from './PopularBooks.module.css'; // Импортируем стили
import booksData from '../../data/popular_books.json'; // Импортируем данные о книгах
import '@/styles/globals.css'
import { AppLayout } from '../AppLayout/AppLayout';
import BookList from '../BookList/BookList';

const PopularBooks = () => {
  return (
    <AppLayout>

      <div className='bookList'>
        <h2 className={styles.header}>Популярные книги</h2>
        <BookList data={booksData} />
      </div>
    </AppLayout>
  );
};

export default PopularBooks;