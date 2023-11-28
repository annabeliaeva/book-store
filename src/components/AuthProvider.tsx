import { getCookie, deleteCookie } from 'cookies-next'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

interface LayoutProps {
    children: React.ReactNode
}

export function AuthProvider(props: LayoutProps) {

    const [user, setUser] = useState(null)
    const [sessionString, setSessionString] = useState<string>('')
    const [loading, setLoading] = useState(true)


    async function logOut() {
        deleteCookie('session')
        const path = Router.asPath
        // if we are on settings page...
        if (new RegExp('\\/user\\/\\w*\\/(settings|referal)').test(path)) {
            // ...we should redirect
            Router.push('/').then(() => Router.reload())
        } else {
            Router.reload()
        }
    }


    const value: AuthContext = {
        user,
        sessionString,
        loading,
        logOut
    }


    useEffect(() => {
        const session = getCookie('session')
        if (session) {
            fetch('/api/session')
                .then(res => res.json())
                .then(res => {
                    try {
                        const user = res

                        if (user) {
                            setUser(user)
                            setSessionString(session.toString())
                        }
                        else logOut()
                    } catch (exc) {
                        logOut()
                    } finally {
                        setLoading(false)
                    }
                })
        }else {
            setLoading(false)
        }
    }, [props])


    return (
        <>
            <AuthContext.Provider value={value}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}
