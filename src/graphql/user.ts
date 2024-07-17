import { gql } from '@apollo/client';

export const USER_INFO_QUERY = gql`
  query UserInfo {
    user: userInfo {
      id
      firstName
      lastName
      email
      phone
      bonus
    }
  }
`;
