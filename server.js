const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");
const typeDefs = require("./TypeDefs");
const resolvers = require("./Resolvers");
const { connection } = require("./Database/util");
const { verifyUser } = require("./Helper/context");
const Dataloader = require("dataloader");
const loaders = require("./Loaders");

//evironment variabless
dotEnv.config();

//express
const app = express();

connection();

//Midlewares
app.use(cors());

app.use(express.json());

//settingup apollo server middleware

const apolloserver = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    req.loggedInUserId = await verifyUser(req);
    console.log("==", req.loggedInUserId);
    if (req.loggedInUserId) {
      console.log("", req.loggedInUserId);
      return {
        email: req.email,
        loggedInUserId: req.loggedInUserId,
        loaders: {
          user: new Dataloader(keys => loaders.user.batchUsers(keys)),
        },
      };
    } else {
      req.loggedInUserId = await verifyUser(req);
    }
  },
});

apolloserver.applyMiddleware({ app, path: "/graphql" });

//*************************

//creating port

const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  console.log(`listeing to port: ${port}`);
  console.log(`Graphql Endpoint: ${apolloserver.graphqlPath}`);
});
//***************

//paths

app.use("/", (req, res) => {
  console.log(req.headers);
  res.send({ Welcome: "hello" });
});
apolloserver.installSubscriptionHandlers(httpServer);
