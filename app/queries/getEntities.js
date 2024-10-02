import { gql } from "@apollo/client";

export const GET_ENTITIES = gql`
  query GetEntities {
    getEntities {
      id
      name
      ... on Contact {
        email
      }
      ... on Company {
        industry
      }
    }
  }
`;
