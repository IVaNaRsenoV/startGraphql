require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

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

const allBooks = [
  {
    id: "1",
    title: "Another awesome book 1",
    description: "123",
    author: {
      id: "1",
      firstName: "Alex",
      lastName: "Kislov",
    },
  },
  {
    id: "2",
    title: "Another awesome book 2",
    description: "456",
    author: {
      id: "2",
      firstName: "Dart",
      lastName: "Veider",
    },
  },
];

const root = {
  getAllBooks: () => {
    return allBooks;
  },
  getBook: (params) => {
    return allBooks.find(({ id }) => params.id === id);
  },
  addBook: (params) => {
    allBooks.push({
      id: allBooks.length + 1,
      ...params.book,
      author: {
        id: "1",
        firstName: "John",
        lastName: "RD2",
      },
    });
    return true;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(PORT, () => console.log(`Server works ${PORT}`));
