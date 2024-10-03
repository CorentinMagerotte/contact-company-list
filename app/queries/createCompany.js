import {gql} from "@apollo/client";

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($contactEmail: String!, $name: String!, $industry: String!) {
    createEntity(
      input: {
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
