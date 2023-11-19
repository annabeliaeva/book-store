// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Проверяем наличие cookie с именем пользователя
    const user = Cookies.getCookie('user');

    if (!user) {
        return res.status(401).json({ error: 'Неавторизованный доступ' });
    }

    res.status(200).json({ message: `Привет, ${user}! Это защищенный маршрут.` });
}