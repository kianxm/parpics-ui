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

export const EDIT_CLIENT = gql`
  mutation EditClient($clientId: ID!, $clientInput: ClientInput!) {
    editClient(clientId: $clientId, clientInput: $clientInput) {
      name
      date
      link
      accessCode
      location
      hasPaid
    }
  }
`;

export const ADD_PHOTO_TO_CLIENT = gql`
  mutation AddPhotoToClient($clientId: ID!, $photoInput: PhotoInput!) {
    addPhotoToClient(clientId: $clientId, photoInput: $photoInput) {
      name
      photoCount
      photos {
        name
        createdAt
        format
        bytes
        url
        publicId
        version
        assetId
      }
    }
  }
`;

export const DELETE_PHOTO = gql`
  mutation DeletePhoto($publicId: String!) {
    deletePhoto(publicId: $publicId)
  }
`;

export const DELETE_ALL_CLIENT_PHOTOS = gql`
  mutation DeleteAllClientPhotos($clientId: ID!) {
    deleteAllClientPhotos(clientId: $clientId)
  }
`;
