import React, { useState } from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import styles from './Header.module.css'; // Импортируем стили CSS Modules
import Link from 'next/link';
import path from 'path';
import { getAuthUser } from '@/middleware/auth';
import { deleteCookie, setCookie } from 'cookies-next';
import Router from 'next/router';

const Header = () => {

  const imagePath = path.join('/images', 'logo.png'); // Укажите путь к изображению внутри папки public
  const user = getAuthUser()

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    deleteCookie('user')
    Router.reload()
  };

  return (
    <div className={`${styles.header} bg-secondary`}>
      <Navbar expand="lg" className={styles.navbar}>
        <Navbar.Collapse id="basic-navbar-nav">
          <Image className={styles.logo} src={imagePath} />
          <Link href="/" className={styles.navLink}>
            Главная
          </Link>
          <Link href="/catalog" className={styles.navLink}>
            Каталог
          </Link>
          <Link href="/shopping-cart" className={styles.navLink}>
            Корзина
          </Link>
          <Link href="/about" className={styles.navLink}>
            О нас
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Контакты
          </Link>

          <div
            className={styles.userContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {!user ? (
              <>
                <Link href="/registration" className={styles.navLink}>
                  Регистрация
                </Link>
                <Link href="/auth" className={styles.navLink}>
                  Войти
                </Link>
              </>
            ) : (
              <>
                <div className={styles.navLink} onClick={handleLogout}>
                  {user}
                </div>
                {isHovered && (
                  <Button variant="danger" onClick={handleLogout}>
                    Выйти
                  </Button>
                )}
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;