import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Registration.module.css'
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';

interface RegistrationPageProps { }

interface FormData {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
}


const Registration = (props: RegistrationPageProps) => {
    // Состояния для полей формы

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });



    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Обработчик отправки формы
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ваша логика регистрации пользователя здесь
        // Например, отправка данных на сервер
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status == 200) {
                console.log('Регистрация успешна!');
                Router.reload()
                // Возможно, здесь вы захотите выполнить дополнительные действия, например, перенаправление на другую страницу
            } else {
                console.error('Ошибка при регистрации');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <Container className={`flex-align-center flex-center flex-col ${styles.main_container}`}>
            <h2>Регистрация</h2>
            <Form onSubmit={handleSubmit} className={styles.container}>
                <Container className={styles.name_and_surname}>
                    <Form.Group controlId="firstName">
                        <Form.Control
                            name="firstName"
                            type="text"
                            placeholder="Имя"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Фамилия"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </Form.Group>
                </Container>
                <Container className={styles.name_and_surname}>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Электронная почта"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </Form.Group>
                </Container>

                <Button variant="light_green" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    );
};

export default Registration;
