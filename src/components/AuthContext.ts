/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react'

export interface AuthContext {
    user,
    sessionString: string
    loading: boolean
    logOut: () => void
}

const authContextDefaults: AuthContext = {
    user: null,
    sessionString: null,
    loading: null,
    logOut: () => null
}

export const AuthContext = createContext<AuthContext>(authContextDefaults)

export function useAuth() {
    return useContext(AuthContext)
}
