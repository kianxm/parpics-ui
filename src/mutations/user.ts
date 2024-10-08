import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      name
      username
      email
      password
      token
    }
  }
`;

export const REGISTER_VIEWER = gql`
  mutation RegisterViewer($registerInput: RegisterInput) {
    registerViewer(registerInput: $registerInput) {
      name
      username
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
