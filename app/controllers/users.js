const express = require("express");

const models = require("../models");

// router for /api/v1/users
const router = express.Router();

router.get("/", async (request, response) => {
    var result = await models.User.findAll();

    response.send({items: result});
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
        password: request.body.password,
        salt: request.body.salt
     });

    response.status(201).send({user: user});
});

router.post("/:id/collections", async (request, response) => {
    var user = await models.User.findById(parseInt(request.params.id));

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
    var user = await models.User.findById(parseInt(request.params.id));

    if (!user)
    {
        response.status(400).send({error: `A user with id ${request.params.id} was not found.`});

        return;
    }

    /*
    Item.findAll({
        include: [{
            model: User,
            where: {id: request.params.id}
        }],
        attributes["title", "url"]
    })
    */
    var items = await user.items();

    response.status(200).send({items: items});
});

module.exports = router;
