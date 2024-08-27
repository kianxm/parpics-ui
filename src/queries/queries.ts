import { gql } from "@apollo/client";

export const getUserById = gql`
  query Query($userId: ID!) {
    getUserById(userId: $userId) {
      name
      username
      email
      password
      token
    }
  }
`;

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
      id
      userId
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

export const getClient = gql`
  query GetClient($clientId: ID!) {
    getClient(clientId: $clientId) {
      id
      userId
      name
      link
      accessCode
      location
      date
      hasPaid
      createdAt
      updatedAt
      websiteTemplate
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
      settings {
        enableWebsite
        allowPhotoComments
        allowAlbumComments
        allowSingleDownload
        allowBulkDownload
        allowFavorites
        allowSharing
        allowViewing
        allowPayment
        showWatermark
      }
    }
  }
`;

export const getClientSettings = gql`
  query GetClientSettings($clientId: ID!) {
    getClientSettings(clientId: $clientId) {
      enableWebsite
      allowPhotoComments
      allowAlbumComments
      allowSingleDownload
      allowBulkDownload
      allowFavorites
      allowSharing
      allowViewing
      allowPayment
      showWatermark
    }
  }
`;

export const getDashboardOverview = gql`
  query GetDashboardOverview($userId: ID!) {
    getDashboardOverview(userId: $userId) {
      totalClients
      totalPaidClients
      totalPhotos
    }
  }
`;

export const getUserByUsername = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      name
      email
      username
    }
  }
`;

export const checkAccessCode = gql`
  query CheckAccessCode($accessCode: Int!) {
    checkAccessCode(accessCode: $accessCode) {
      isValid
      link
    }
  }
`;

export const getAlbumPage = gql`
  query GetAlbumPage($link: String!) {
    getAlbumPage(link: $link) {
      id
      name
      link
      accessCode
      location
      date
      hasPaid
      createdAt
      updatedAt
      photoCount
      userId
      websiteTemplate
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
        comments {
          id
          author
          text
          createdAt
        }
      }
      settings {
        enableWebsite
        allowPhotoComments
        allowAlbumComments
        allowSingleDownload
        allowBulkDownload
        allowFavorites
        allowSharing
        allowViewing
        allowPayment
        showWatermark
      }
    }
  }
`;
