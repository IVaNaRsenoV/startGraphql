const allBooks = require("./data");

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

exports.modules = root;
