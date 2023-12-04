import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import styles from './Header.module.css'; // Импортируем стили CSS Modules
import Link from 'next/link';
import path from 'path';
import { deleteCookie, setCookie } from 'cookies-next';
import Router from 'next/router';
import { useAuth } from '../AuthContext';

const Header = () => {

  const imagePath = path.join('/images', 'logo.png'); // Укажите путь к изображению внутри папки public
  const auth = useAuth()

  const [isHovered, setIsHovered] = useState(false);
  const [cart, setCart] = useState(0)

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    auth.logOut()
  };


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    setCart(savedCart.length?? 0);
}, []);

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
            Корзина {cart > 0? `(${cart})` : ''}
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
            {!auth.user ? (
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
                  {auth.user.email}
                </div>
                {isHovered && (<>
                  <Button onClick={() => Router.push('/profile')} className={styles.navLink}>
                    Профиль
                  </Button>
                  <Button variant="danger" onClick={handleLogout}>
                    Выйти
                  </Button>

                </>)}
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;