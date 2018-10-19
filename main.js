require("dotenv").config();

const express = require("express");
const controllers = require("./controllers")

const app = express();

app.use("/api/v1/items", controllers.publicItems);
app.use("/api/v1/users/:id/items", controllers.userItems);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started.");
});
