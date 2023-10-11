import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import styles from './Header.module.css'; // Импортируем стили CSS Modules
import Link from 'next/link';
import path from 'path';

const Header = () => {

  const imagePath = path.join('/images', 'logo.png'); // Укажите путь к изображению внутри папки public

  return (
    <div className={`${styles.header} bg-secondary`}>
      <Navbar expand="lg" className={styles.navbar}>
        <Navbar.Collapse id="basic-navbar-nav">
            <Image className={styles.logo} src={imagePath}/>
            <Link href="/" className={styles.navLink}>
              Главная
            </Link>
            <Link href="/shopping-card" className={styles.navLink}>
              Корзина
            </Link>
            <Link href="/about" className={styles.navLink}>
              О нас
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Контакты
            </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;