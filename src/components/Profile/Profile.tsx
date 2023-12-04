
import { Container, Row } from 'react-bootstrap'
import style from './Profile.module.css'


export const MyProfile = ({ user, orders }) => {

    return (
        <Container className={`flex-col flex-align-center`}>
            <Row>
                <h2 className={style.header_text}>Личные данные</h2>
            </Row>
            <Row className={style.text_dec}>
                {user.firstName + ' ' + user.lastName}<br />
            </Row>
            <Row className={style.text_dec}>
                {user.email}
            </Row>
            <Row>
                <h2 className={style.header_text}>Мои заказы</h2>
            </Row>
            <Row className={style.order_table}>
                {orders.length > 0 ?
                    orders.map(o => {
                        return <Container className={style.order_item} key={o?.id}>
                            <Row className={style.order_text_dec}>
                                Номер заказа #{o.id}
                            </Row>
                            <Row>
                                <Row className={style.order_text_dec}>
                                    Состав заказа:
                                </Row>
                                {o.books.map(x => {
                                    return <Container className='flex-col' key={x.id}>
                                        <Row className={style.simple_text}>

                                            {x.author} - {x.title}  ({o.books_id.filter(id => id == x.id).length} шт. ✕ {x.price}₽)
                                        </Row>

                                    </Container>
                                    // x.title + ` (${o.books_id.filter(id => id == x.id).length})`).join(', ')
                                })}
                            </Row>
                            <Row className={style.order_text_dec}>
                                Сумма заказа:
                            </Row>
                            <Row className={style.simple_text}>
                                {o.books.reduce((sum, book) => sum + book.price, 0)}₽
                            </Row>
                            <Row className={style.order_text_dec}>
                                Данные доставки:
                            </Row>
                            <Row className={style.simple_text}>
                                {o.delivery_to}
                            </Row>
                            <Row className={style.order_text_dec}>
                                Дата заказа:
                            </Row>
                            <Row className={style.simple_text}>
                                {(o.creation_date as Date).toLocaleString()}
                            </Row>
                            <Row className={style.order_text_dec}>
                                Статус заказа
                            </Row>
                            <Row className={style.simple_text}>
                                {o.status}
                            </Row>
                        </Container>
                    }) :
                    <Row>У вас еще не было заказов!</Row>}
            </Row>
        </Container >

    )
}

