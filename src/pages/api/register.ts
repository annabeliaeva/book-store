import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { hash } from 'bcryptjs';
import { createCookieSessionString } from '@/middleware/createSessionString';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password, firstName, lastName } = req.body;

        // Хешируем пароль (лучше использовать bcrypt в реальном приложении)
        const hashedPassword = await hash(password, 10);

        // Сохраняем пользователя (вместо базы данных используем объект)
        const user = { email, password: hashedPassword };

        let prisma = new PrismaClient()
        let createdUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            }
        })

        if (!createdUser) {
            return res.status(202).json({ success: false });
        }

        // Устанавливаем cookie с именем пользователя
        setCookie('session', createCookieSessionString(email, hashedPassword), { req, res });

        res.status(200).json({ success: true });
    } else {
        res.status(405).end();
    }
}