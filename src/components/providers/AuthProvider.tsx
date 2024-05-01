'use client';

import { TypeAddress, TypeUser } from '@/shared/types';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type SignInInput = {};

type SignUpInput = {};

type TypeAuthUser = TypeUser & {
  address?: TypeAddress;
};

interface IAuthContext {
  user: TypeAuthUser | null;
  setUser: Dispatch<SetStateAction<TypeAuthUser | null>>;
  signIn: (data: SignInInput) => void;
  signUp: (data: SignUpInput) => void;
  signOut: () => void;
}

interface IAuthProviderProps extends PropsWithChildren {
  initialUser: TypeUser | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ initialUser, children }: IAuthProviderProps) => {
  const [user, setUser] = useState<TypeAuthUser | null>(initialUser);

  //TODO: add signIn, signUp and signOut functions
  const signIn = useCallback((data: SignInInput) => {}, []);

  const signUp = useCallback((data: SignUpInput) => {}, []);
  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
