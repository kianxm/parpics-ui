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
        isFavorite
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

export const TOGGLE_FAVORITE_PHOTO = gql`
  mutation ToggleFavoritePhoto($clientId: ID!, $publicId: String!) {
    toggleFavoritePhoto(clientId: $clientId, publicId: $publicId)
  }
`;

export const ADD_COMMENT_TO_PHOTO = gql`
  mutation AddCommentToPhoto(
    $clientId: ID!
    $publicId: String!
    $commentInput: CommentInput!
  ) {
    addCommentToPhoto(
      clientId: $clientId
      publicId: $publicId
      commentInput: $commentInput
    ) {
      name
      createdAt
      format
      bytes
      url
      publicId
      version
      assetId
      isFavorite
      comments {
        author
        text
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($clientId: ID!, $publicId: String!, $commentId: ID!) {
    deleteComment(
      clientId: $clientId
      publicId: $publicId
      commentId: $commentId
    )
  }
`;
