import { gql } from "@apollo/client";

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
      ... on Company {
        contactEmail
        industry
      }
    }
  }
`;
