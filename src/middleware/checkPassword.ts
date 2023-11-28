import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

async function checkBcryptPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}

function checkShaPassword(password: string, hash: string): boolean {
    const shaHash = hash.split('$')[2]
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
    return shaHash === passwordHash
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
    if (hash.startsWith('$2a$')) {
        return await checkBcryptPassword(password, hash)
    } else if (hash.startsWith('$SHA$')) {
        return checkShaPassword(password, hash)
    } else {
        throw new Error('Unsupported hash format')
    }
}