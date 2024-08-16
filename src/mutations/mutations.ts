import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      password
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      password
      token
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($clientInput: ClientInput, $userId: ID!) {
    createClient(clientInput: $clientInput, userId: $userId) {
      name
      date
      link
      accessCode
      location
      hasPaid
      userId
    }
  }
`;
