import { Button, Col, Container, Form, Row } from "react-bootstrap";
import style from './MakeOrder.module.css'
import { useState } from "react";
import { getAuthUser } from "@/middleware/auth";
import Router from "next/router";

const MakeOrder = ({ user, cart }) => {
    const [formData, setFormData] = useState({
        name: user.firstName,
        surname: user.lastName,
        email: user.email,
        address: '',
        deliveryDate: '',
        deliveryTime: '',
        payMethod: 'CARD'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let bookData = []
        cart.forEach(b => {
            let id = b.book.id
            let quantity = b.quantity

            for (let i = 0; i < quantity; i++)
                bookData.push(id)
        })

        formData['books'] = bookData

        fetch('/api/makeOrder', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 'success') {
                    alert('Заказ оформлен!')
                    Router.push('/profile')

                    localStorage.setItem('shoppingCart', '[]')
                }
            })
    }

    return (
        <Container className={`flex-col flex-align-center`}>
            <Row>
                <h2 className={style.header_text}>Оформление заказа</h2>
            </Row>
            <Row className={'flex-align-center'}>
                <Form onSubmit={handleSubmit}>
                    <Col className={`flex-row ${style.name_and_surname}`}>
                        <Form.Group controlId="formName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Имя получателя"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSusname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия получателя"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email получателя"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Адрес получателя"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col className={`flex-row justify-content-center ${style.date_and_time}`}>
                        <Form.Group controlId="formDeliveryDate">
                            <Form.Label>Дата доставки</Form.Label>
                            <Form.Control
                                type="date"
                                name="deliveryDate"
                                value={formData.deliveryDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDeliveryTime">
                            <Form.Label>Время доставки</Form.Label>
                            <Form.Control
                                type="time"
                                name="deliveryTime"
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPayMethod">
                            <Form.Label>Способ оплаты</Form.Label>
                            <Form.Select
                                name={"payMethod"}
                                value={formData.payMethod}
                                onChange={handleChange}
                                required>
                                <option value='CARD'>Картой</option>
                                <option value='CASH'>Наличными</option>
                            </Form.Select>

                        </Form.Group>
                    </Col>
                    <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
                        Оформить заказ
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default MakeOrder
