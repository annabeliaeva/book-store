
import { AppLayout } from '@/components/AppLayout/AppLayout'
import MakeOrder from '@/components/MakeOrder/MakeOrder';
import { getSessionUser } from '@/middleware/manager';
import '@/styles/globals.css'
import { PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';


export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const userCred = await getSessionUser(ctx)
  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where: { email: userCred.email },
  });

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: { user },
  }
}

const Order = ({ user }) => {

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    setCartData(savedCart);
  }, []);

  return (
    <AppLayout>
      <MakeOrder user={user} cart={cartData} />
    </AppLayout>
  );
};

export default Order;
