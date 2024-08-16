import { gql } from "@apollo/client";

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

export const DELETE_CLIENT = gql`
  mutation DeleteClient($clientId: ID!) {
    deleteClient(clientId: $clientId)
  }
`;
