import { gql } from "@apollo/client";

export const GET_ENTITIES = gql`
  query GetEntities {
    getEntities {
      id
      name
      ... on Contact {
        email
        phone
      }
      ... on Company {
        industry
        contactEmail
      }
    }
  }
`;
