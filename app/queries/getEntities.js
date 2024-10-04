import { gql } from "@apollo/client";

/**
 * Query who get the entire mixed list
 */
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
