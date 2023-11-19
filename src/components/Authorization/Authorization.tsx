import React, { useState, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Authorization.module.css'
import { setCookie } from 'cookies-next';
import Router from 'next/router';

interface RegistrationPageProps { }

const Authorization = (props: RegistrationPageProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCookie('user', email)

        Router.reload()
    };

    return (
        <Container className={`flex-align-center flex-center flex-col ${styles.main_container}`}>
            <h2>Авторизация</h2>
            <Form onSubmit={handleSubmit} className={styles.container}>
                <Container className={styles.name_and_surname}>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="Электронная почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Container>

                <Button variant="light_green" type="submit">
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default Authorization;
