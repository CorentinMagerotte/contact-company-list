const { ApolloServer, gql } = require('apollo-server');

// Define the GraphQL schema
const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  interface Entity {
    id: ID!
    name: String!
  }

  type Contact implements Entity {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Company implements Entity {
    id: ID!
    name: String!
    industry: String!
    contactEmail: String
  }

  input CreateEntityInput {
    entityType: EntityType!
    name: String!
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  input UpdateEntityInput {
    id: ID!
    entityType: EntityType!
    name: String
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  enum EntityType {
    CONTACT
    COMPANY
  }

  type Mutation {
    createEntity(input: CreateEntityInput): Entity
    updateEntity(input: UpdateEntityInput): Entity
  }

  type Query {
    getEntities: [Entity]
    getEntity(id: ID!): Entity
  }
`;

// Mock data for Contacts and Companies
let contacts = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@example.com', phone: '555-123-4567' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '123-789-4560' },
    { id: '5', name: 'Robert Wilson', email: 'robert.wilson@example.com', phone: '456-789-1230' },
    { id: '6', name: 'Sarah Lee', email: 'sarah.lee@example.com', phone: '789-123-4560' },
    { id: '7', name: 'David Brown', email: 'david.brown@example.com', phone: '321-654-9870' },
    { id: '8', name: 'Linda White', email: 'linda.white@example.com', phone: '654-321-7890' },
    { id: '9', name: 'James Green', email: 'james.green@example.com', phone: '789-654-1234' },
    { id: '10', name: 'Patricia Black', email: 'patricia.black@example.com', phone: '555-789-1230' }
];


let companies = [
    { id: '1', name: 'TechCorp', industry: 'Technology', contactEmail: 'info@techcorp.com' },
    { id: '2', name: 'HealthInc', industry: 'Healthcare', contactEmail: 'contact@healthinc.com' },
    { id: '3', name: 'FinanceSolutions', industry: 'Finance', contactEmail: 'support@financesolutions.com' },
    { id: '4', name: 'EduWorld', industry: 'Education', contactEmail: 'info@eduworld.com' },
    { id: '5', name: 'GreenEnergy', industry: 'Energy', contactEmail: 'contact@greenenergy.com' },
    { id: '6', name: 'Foodies', industry: 'Food & Beverage', contactEmail: 'info@foodies.com' },
    { id: '7', name: 'AutoTech', industry: 'Automotive', contactEmail: 'sales@autotech.com' },
    { id: '8', name: 'MediLife', industry: 'Healthcare', contactEmail: 'contact@medilife.com' },
    { id: '9', name: 'RetailMax', industry: 'Retail', contactEmail: 'support@retailmax.com' },
    { id: '10', name: 'CloudNet', industry: 'Technology', contactEmail: 'info@cloudnet.com' }
];


// Define the resolvers
const resolvers = {
    Query: {
        getEntities: () => [...contacts, ...companies],
        getEntity: (_, { id }) => {
            return contacts.find((c) => c.id === id) || companies.find((c) => c.id === id);
        },
    },
    Mutation: {
        createEntity: (_, { input }) => {
            const { entityType, name, email, phone, industry, contactEmail } = input;

            if (entityType === 'CONTACT') {
                const newContact = { id: String(contacts.length + 1), name, email, phone };
                contacts.push(newContact);
                return newContact;
            }

            if (entityType === 'COMPANY') {
                const newCompany = { id: String(companies.length + 1), name, industry, contactEmail };
                companies.push(newCompany);
                return newCompany;
            }

            return null;
        },
        updateEntity: (_, { input }) => {
            const { id, entityType, name, email, phone, industry, contactEmail } = input;

            if (entityType === 'CONTACT') {
                const contactIndex = contacts.findIndex((c) => c.id === id);
                if (contactIndex >= 0) {
                    contacts[contactIndex] = { ...contacts[contactIndex], name, email, phone };
                    return contacts[contactIndex];
                }
            }

            if (entityType === 'COMPANY') {
                const companyIndex = companies.findIndex((c) => c.id === id);
                if (companyIndex >= 0) {
                    companies[companyIndex] = { ...companies[companyIndex], name, industry, contactEmail };
                    return companies[companyIndex];
                }
            }

            return null;
        },
    },
    Entity: {
        // Resolve the correct type for the Entity interface
        __resolveType(obj) {
            if (obj.email) {
                return 'Contact';
            }
            if (obj.industry) {
                return 'Company';
            }
            return null;
        },
    },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
