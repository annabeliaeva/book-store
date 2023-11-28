import { checkPassword } from '../../middleware/checkPassword'
import { NextApiRequest, NextApiResponse } from 'next'
import { createCookieSessionString } from '../../middleware/createSessionString'
import { setCookie } from 'cookies-next'
import { PrismaClient } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body)
    console.log(body)

    let prisma = new PrismaClient()
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: body.email,
                mode: 'insensitive'
            }
        }
    })

    console.log(user)

    const check = await checkPassword(body.password, user.password)
    if (!check) return res.status(403).send('Forbidden') // unauthorized

    let sessionString = createCookieSessionString(user.email, user.password)
    setCookie('session', sessionString, { req, res, maxAge: 60 * 60 * 24 * 30 })

    return res.status(200).json({ message: 'Успешная авторизация!' })
    // return res.status(200).send(user.nickname)
}