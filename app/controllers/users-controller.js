const express = require("express");

const models = require("../models");

// router for /api/v1/users
const router = express.Router();

router.get("/", async (request, response) => {
    var result = await models.User.findAll({
        attributes: ["name", "email"]
    });

    response.send({items: result});
});

const isNumeric = (value) => !isNaN(value);

router.get("/:id", async (request, response) => {
    var userId = request.params.id;
    var userAttributes = ["name", "email"];

    var user = isNumeric(userId) ?
        await models.User.findById(userId, {attributes: userAttributes}) :
        await models.User.findByExternalId(userId, {attributes: userAttributes});

    if (!user)
    {
        response.status(404).send({error: `No user with id ${request.params.id} was found.`});

        return;
    }
    
    response.send(user);
});

router.post("/", async (request, response) => {
    if (!request.body.name)
    {
        response.status(400).send({error: "The name of the user is required."});

        return;
    }

    if (!request.body.email)
    {
        response.status(400).send({error: "The email of the user is required."});

        return;
    }

    var user = await models.User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password || "",
        salt: request.body.salt || "",
        external_id: request.body.external_id || ""
     });

    response.status(201).send({user: user});
});

router.post("/:id/collections", async (request, response) => {
    var user = await models.User.findById(request.params.id);

    if (!user)
    {
        response.status(400).send({error: `A user with id ${request.params.id} was not found.`});

        return;
    }

    if (!request.body.title)
    {
        response.status(400).send({error: "The title of the collection is required."});

        return;
    }

    var collection = await user.addCollection(request.body.title);

    response.status(201).send({collection: collection});
});

router.get("/:id/items", async (request, response) => {
    var user = await models.User.findById(request.params.id);

    if (!user)
    {
        response.status(400).send({error: `A user with id ${request.params.id} was not found.`});

        return;
    }

    var items = await user.getItems();

    items = items.map(item => {
        return {
            title: item.title,
            url: item.url,
            comment: item.UserItem.comment,
            rating: item.UserItem.rating
        }
    });

    response.status(200).send({items: items});
});

module.exports = router;
