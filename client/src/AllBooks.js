import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
// import * as GetAllBooks from "./GetAllBooks.graphql";
// import * as GetAllBooks from "./GetAllBooks.graphql";

const GetAllBooks = gql`
  query GetAllBooks {
    getAllBooks {
      id
      title
      description
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

export default ({ onSelect }) => {
  const { data, loading } = useQuery(GetAllBooks);

  return (
    <div>
      <h1>All books</h1>

      {loading && <div>Loading...</div>}

      {!loading && data.getAllBooks && (
        <ul>
          {data.getAllBooks.map((book) => (
            <li key={book.title}>
              {book.id}: {book.title} ({book.author.firstName}{" "}
              {book.author.lastName}){" "}
              <button onClick={() => onSelect(book)}>select</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
