import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_UESR = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
