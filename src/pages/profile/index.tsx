
import { AppLayout } from '@/components/AppLayout/AppLayout'
import { MyProfile } from '@/components/Profile/Profile';
import { getSessionUser } from '@/middleware/manager';
import '@/styles/globals.css'
import { PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const userCred = await getSessionUser(ctx)

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
        where: { email: (await userCred)?.email },
    });

    if (!user) {
        return {
            notFound: true,
        }
    }


    const orderData = await prisma.order.findMany({
        where: {
            User: user
        }
    })

    const orders = await Promise.all(orderData.map(async (order) => {
        const books = await prisma.book.findMany({
            where: {
                id: { in: order.books_id }
            }
        })

        return { ...order, books: books }
    }))


    return {
        props: { user, orders },
    }
}


const Profile = (props) => {

    console.log(props.orders)
    return (
        <AppLayout>
            <MyProfile user={props.user} orders={props.orders} />
        </AppLayout>
    );
};

export default Profile;
