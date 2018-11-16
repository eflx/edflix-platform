const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const controllers = require("./controllers")

// adapted from the Auth0 documentatin
const auth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `${process.env.AUTH0_AUDIENCE}`,
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
});

const app = express();

app.use(cors());

app.use(auth);

app.use((error, request, response, next) => {
    if (error.name === "UnauthorizedError")
    {
        return response.status(401).send({error: {code: 401, message: "The authorization token is invalid."}});
    }

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1/users", controllers.users);

module.exports = app;
