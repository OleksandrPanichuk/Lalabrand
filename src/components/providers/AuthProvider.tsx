'use client';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/shared/constants';
import { useRouter } from '@/shared/navigation';
import { TypeAddress, TypeUser } from '@/shared/types';
import { deleteCookie } from 'cookies-next';
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

  signOut: () => void;
}

interface IAuthProviderProps extends PropsWithChildren {
  initialUser: TypeUser | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ initialUser, children }: IAuthProviderProps) => {
  const [user, setUser] = useState<TypeAuthUser | null>(initialUser);

  const router = useRouter();

  const signOut = useCallback(() => {
    deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
    deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
    setUser(null);

    router.refresh();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
