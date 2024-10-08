import { gql } from "@apollo/client";

/**
 * Query who update a contact entity with a new value in email, name or phone
 */
export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact($id: ID!, $email: String!, $name: String!, $phone: String!) {
    updateEntity(
      input: {
        id: $id
        email: $email
        name: $name
        phone: $phone
        entityType: CONTACT
      }
    ) {
      id
      name
      ... on Contact {
        email
        phone
      }
    }
  }
`;
