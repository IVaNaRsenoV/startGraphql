import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const GetBook = gql`
  query GetBook($id: ID!) {
    getBook(id: $id) {
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

export default ({ id }) => {
  const { data } = useQuery(GetBook, {
    variables: {
      id: id,
    },
  });

  console.log(data);

  const book = data ? data.getBook : null;

  return book ? (
    <div>
      <h1>{book.title}</h1>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
