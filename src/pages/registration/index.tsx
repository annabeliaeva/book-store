
import { AppLayout } from '@/components/AppLayout/AppLayout'
import Registration from '@/components/Registration/Registration';
import '@/styles/globals.css'
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    let user = getCookie('user', ctx)

    if (user) return {
        redirect: {
            destination: '/'
        }
    }

    return { props: {} }
}

const RegPage = () => {
    return (
        <AppLayout>
            <Registration />
        </AppLayout>
    )
}

export default RegPage