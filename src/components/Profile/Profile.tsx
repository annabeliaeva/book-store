
import { Container, Row } from 'react-bootstrap'
import style from './Profile.module.css'


export const MyProfile = ({ user, orders }) => {

    return (
        <Container className={`flex-col flex-align-center`}>
            <Row>
                <h2 className={style.header_text}>Личные данные</h2>
            </Row>
            <Row>
                #{user.id}<br />
                {user.firstName + ' ' + user.lastName}<br />
                {user.email}
            </Row>
            <Row>
                <h2 className={style.header_text}>Мои заказы</h2>
            </Row>
            {orders.length > 0 ?
                orders.map(o => {
                    return <Row>
                        Номер заказа #{o.id} <br />
                        Книги: {o.books.map(x => x.title + ` (${o.books_id.filter(id => id == x.id).length})`).join(', ')} <br />
                        Доставка: {o.delivery_to} <br />
                        Дата заказа: {(o.creation_date as Date).toLocaleString()} <br />
                    </Row>
                }) :
                <Row>У вас еще не было заказов!</Row>}
        </Container >

    )
}

