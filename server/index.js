require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema.js");
const root = require("./services");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(PORT, () => console.log(`Server works ${PORT}`));
