import { AppLayout } from '@/components/AppLayout/AppLayout';
import BookList from '../components/BookList/BookList'; // Импортируем компонент BookList
import Header from "../components/Header/Header"
// import SearchBar from '../components/SearchBar'; // Импортируем компонент SearchBar
import '@/styles/custom.scss'; // Import your custom SCSS file
import '@/styles/globals.css'

const HomePage = () => {
  return (
    // <div className={`main bg-primary`}>
    <BookList />

    // {/* <Header className='bg-secondary' /> */}
    // {/* Поисковая панель */}
    // {/* <SearchBar /> */}

    // {/* Список книг */}
    // {/* <BookList /> */}

    // {/* </div> */}
  );
};

export default HomePage;