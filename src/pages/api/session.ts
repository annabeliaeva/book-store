/**
 * Session auth route to check auth each page request
 */

import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSessionUser } from '../../middleware/manager'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    let sessionString = getCookie('session', { req, res })
    if (!sessionString) return res.status(403).send('Unauthorized')


    let user = await getSessionUser({ req, res })
    if (!user) return res.status(403).send('Unauthorzed')

    const userData = {
        email: user.email
    }

    return res.status(200).send(userData)
}