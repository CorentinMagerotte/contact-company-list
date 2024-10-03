import {gql} from "@apollo/client";

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($email: String!, $name: String!, $phone: String!) {
    createEntity(
      input: {
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
