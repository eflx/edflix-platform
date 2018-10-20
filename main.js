require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const controllers = require("./controllers")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1/items", controllers.publicItems);
app.use("/api/v1/users/:id/items", controllers.userItems);
app.use("/api/v1/users", controllers.users);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started.");
});
