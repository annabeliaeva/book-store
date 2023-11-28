import { getCookie } from 'cookies-next'
import { decrypt } from './createSessionString'
import { PrismaClient } from '@prisma/client'

export async function getSessionUser({ req, res }) {
    let sessionString = getCookie('session', { req, res })
    if (!sessionString) return null

    let decryptedSessionData = decrypt(sessionString).replaceAll('[encode]', '').split('::')

    const prisma = new PrismaClient()
    const user =  await prisma.user.findFirst({
        where: {
            email: decryptedSessionData[0],
            password: decryptedSessionData[1]
        }
    })

    if (!user) return null
    return user
}

