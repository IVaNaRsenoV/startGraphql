const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }
  
  type Book {
    id: ID!
    title: String!
    author: Author
    description: String!
  }
  
  type Query {
    getAllBooks: [Book]!
    getBook(id: ID!): Book!
  }
  
  input BookInput {
    title: String!
    description: String!
  }
  
  type Mutation {
    addBook(book: BookInput!): Boolean
  }
  
`);

module.exports = schema;
