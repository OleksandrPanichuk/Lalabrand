"use client"

import { TypeUser } from "@/shared/types"
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react"

interface IAuthContext {
	user: TypeUser | null
	setUser: Dispatch<SetStateAction<TypeUser | null>>
}

interface IAuthProviderProps extends PropsWithChildren {
	initialUser: TypeUser | null
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({initialUser, children}:IAuthProviderProps) => {
	const [user, setUser] = useState<TypeUser | null>(initialUser)
	return <AuthContext.Provider value={{setUser, user}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
