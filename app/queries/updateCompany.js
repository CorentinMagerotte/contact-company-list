import { gql } from "@apollo/client";

/**
 * Query who update a company entity with a new value in contactEmail, name or industry
 */
export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateContact($id: ID!, $contactEmail: String!, $name: String!, $industry: String!) {
    updateEntity(
      input: {
        id: $id
        contactEmail: $contactEmail
        name: $name
        industry: $industry
        entityType: COMPANY
      }
    ) {
      id
      name
      ... on Company {
        contactEmail
        industry
      }
    }
  }
`;
