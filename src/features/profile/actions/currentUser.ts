'use server';
import { UserInfoResponse } from '@/features/profile';
import { USER_INFO_QUERY } from '@/graphql';
import { getClient } from '@/lib/apollo-server';
import { TypeUser } from '@/shared/types';

export async function currentUser(): Promise<TypeUser | null> {
  try {
    const { data } = await getClient().query<UserInfoResponse>({
      query: USER_INFO_QUERY,
    });

    return data.user;
  } catch (err) {
    return null;
  }
}
