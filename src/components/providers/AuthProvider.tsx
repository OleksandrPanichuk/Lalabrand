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


type TypeAuthUser = TypeUser & {
  address?: TypeAddress;
};

interface IAuthContext {
  user: TypeAuthUser | null;
  setUser: Dispatch<SetStateAction<TypeAuthUser | null>>;
}

interface IAuthProviderProps extends PropsWithChildren {
  initialUser: TypeUser | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ initialUser, children }: IAuthProviderProps) => {
  const [user, setUser] = useState<TypeAuthUser | null>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
