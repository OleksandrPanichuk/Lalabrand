'use client';

import { TypeUser } from '@/shared/types';
import { PropsWithChildren, createContext, useCallback,useContext, useState } from 'react';

type SignInInput = {};

type SignUpInput = {};

interface IAuthContext {
  user: TypeUser | null;
  signIn: (data: SignInInput) => void;
  signUp: (data: SignUpInput) => void;
  signOut: () => void;
}

interface IAuthProviderProps extends PropsWithChildren {
  initialUser: TypeUser | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ initialUser, children }: IAuthProviderProps) => {
  const [user, setUser] = useState<TypeUser | null>(initialUser);

  //TODO: add signIn, signUp and signOut functions
  const signIn = useCallback((data: SignInInput) => {}, []);

  const signUp = useCallback((data: SignUpInput) => {}, []);
  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
