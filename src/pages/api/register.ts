import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Хешируем пароль (лучше использовать bcrypt в реальном приложении)
        const hashedPassword = await hash(password, 10);

        // Сохраняем пользователя (вместо базы данных используем объект)
        const user = { email, password: hashedPassword };

        // Устанавливаем cookie с именем пользователя
        setCookie('user', email, { req, res });

        res.status(200).json({ success: true });
    } else {
        res.status(405).end();
    }
}