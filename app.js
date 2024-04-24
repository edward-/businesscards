const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const testSchema = require("./server/schema/types_schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(
  "/cards",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.2qwkpoe.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`running first nodejs server with graphql port: ${port}`);
    });
  })
  .catch((e) => console.log("Error::" + e));
