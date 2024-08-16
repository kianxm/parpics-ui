import { gql } from "@apollo/client";

export const getAllClients = gql`
  query GetAllClients {
    getAllClients {
      name
      link
      accessCode
      location
      date
      hasPaid
      createdAt
      updatedAt
      photoCount
    }
  }
`;

export const getAllClientsByUserId = gql`
  query GetAllClientsByUserId($userId: ID!) {
    getAllClientsByUserId(userId: $userId) {
      name
      link
      accessCode
      location
      date
      hasPaid
      createdAt
      updatedAt
      photoCount
    }
  }
`;
