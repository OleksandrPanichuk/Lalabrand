import { create } from 'zustand';

export type Status = '' | 'forgot' | 'checkEmail' | 'reset';

type ResetPasswordStore = {
  status: Status;
  changeStatus: (payload: Status) => void;
};

export const useResetPasswordStore = create<ResetPasswordStore>((set) => ({
  status: '',
  changeStatus: (payload) => {
    set(() => ({
      status: payload,
    }));
  },
}));
