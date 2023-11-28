import crypto from 'crypto'
import { Buffer } from 'buffer'

const algorithm = 'aes-256-cbc'
const key = crypto.scryptSync('пароль', 'соль', 32)

export const createCookieSessionString = (login: string, passwordHash: string) => {
    let cookieStr = `[encode]${login}::${passwordHash}[encode]`

    return encrypt(cookieStr)
}


export const encrypt = function (text) {
    try {
        let cipher = crypto.createCipher(algorithm, key)
        let crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex')
        return crypted
    } catch {
        return null
    }
}


export const decrypt = function (text) {
    try {
        let decipher = crypto.createDecipher(algorithm, key)
        let dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8')
        return dec
    } catch {
        return null
    }
}