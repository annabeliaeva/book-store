import { getCookie } from 'cookies-next'

export const getAuthUser = () => getCookie('user')