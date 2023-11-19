// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies-next';
import { compare } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Получаем пользователя (вместо базы данных используем объект)
        const user = { email, password: '$2a$10$somehashedpassword' }; // Здесь укажите реальный хеш пароля

        // Проверяем пароль
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }

        // Устанавливаем cookie с именем пользователя
        Cookies.setCookie('user', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Рекомендуется в production
        });

        res.status(200).json({ success: true });
    } else {
        res.status(405).end();
    }
}