import BookList from '../components/BookList/BookList'; // Импортируем компонент BookList
import Header from "../components/Header/Header"
// import SearchBar from '../components/SearchBar'; // Импортируем компонент SearchBar
import styles from './index.module.css'; // Импортируем стили
import { Container } from 'react-bootstrap';
import '@/styles/custom.scss'; // Import your custom SCSS file
import '@/styles/globals.css'

const HomePage = () => {
  return (
    <div className={`main bg-primary`}>

      <Header className='bg-secondary'/>
      {/* Поисковая панель */}
      {/* <SearchBar /> */}

      {/* Список книг */}
      <BookList />

    </div>
  );
};

export default HomePage;