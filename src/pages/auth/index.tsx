
import { AppLayout } from '@/components/AppLayout/AppLayout'
import Authorization from '@/components/Authorization/Authorization';
import '@/styles/globals.css'
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    let user = getCookie('user', { req: ctx.req, res: ctx.res })

    if (user) return {
        redirect: {
            destination: '/'
        }
    }

    return { props: {} }
}
const AuthPage = () => {
    return (
        <AppLayout>
            <Authorization />
        </AppLayout>
    )
}

export default AuthPage