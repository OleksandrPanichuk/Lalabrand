import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation User($input: UserInput!) {
    user(userInput: $input) {
      id
      email
    }
  }
`;


export const SIGN_IN_MUTATION = gql`
  mutation Login($input:AuthInput!) {
    tokens:login(authInput:$input) {
      accessToken
      refreshToken
    }
  }
`