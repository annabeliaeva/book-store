import { AppLayout } from '@/components/AppLayout/AppLayout';
import PopularBooks from '../components/PopularBooks/PopularBooks'; // Импортируем компонент BookList
import Header from "../components/Header/Header"
// import SearchBar from '../components/SearchBar'; // Импортируем компонент SearchBar
import '@/styles/custom.scss'; // Import your custom SCSS file
import '@/styles/globals.css'

const HomePage = () => {
  return (
    <PopularBooks />
  );
};

export default HomePage;