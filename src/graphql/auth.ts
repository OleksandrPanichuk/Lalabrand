import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation User($input: UserInput!) {
    user(userInput: $input) {
      id
      email
    }
  }
`;
