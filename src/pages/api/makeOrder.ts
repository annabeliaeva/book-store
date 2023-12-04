import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSessionUser } from '@/middleware/manager'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body)
    console.log(body)

    const user = await getSessionUser({ req, res })

    if (!user) return res.send({ status: 'error' })

    let prisma = new PrismaClient()
    const order = await prisma.order.create({
        data: {
            books_id: body.books,
            user_id: user.id,
            creation_date: new Date(),
            delivery_to: body.name + ' ' + body.surname + ' -> ' + body.address + ' ' + body.deliveryDate + ' в ' + body.deliveryTime,
            payment_method: body.payMethod

        }
    })

    return res.status(200).json({ status: 'success' })
}