const express = require("express");

const models = require("../models");

// router for /api/v1/users
const router = express.Router();

const userAttributes = ["name", "email", "id", "external_id"];

async function findUser(request, response, next)
{
    // if there already is a user, then we're good
    if (request.user)
    {
        return next();
    }

    // otherwise, find a user in the database...
    var user = await models.User.find(request.params.id);

    if (!user)
    {
        response.status(404).send({error: `No user with id ${request.params.id} was found.`});

        return;
    }

    // ...and use that as the user in each request
    request.user = user;

    next();
}

router.get("/", async (request, response) => {
    var users = await models.User.findAll();

    response.send({users: users});
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

router.get("/:id", findUser, async (request, response) => {
    response.send(request.user);
});

/*
router.post("/:id/collections", async (request, response) => {
    var user = await models.User.find(request.params.id);

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
*/
const transformItem = item => {
    return {
        id: item.id,
        title: item.title,
        url: item.url,
        comment: item.UserItem.comment,
        rating: item.UserItem.rating
    };
};

router.get("/:id/items", findUser, async (request, response) => {
    var items = await request.user.getItems();

    items = items.map(item => transformItem(item));

    response.status(200).send({items: items});
});

router.post("/:id/items", findUser, async (request, response) => {
    if (!request.body.title)
    {
        response.status(400).send({error: "The title of the item is required."});

        return;
    }

    if (!request.body.url)
    {
        response.status(400).send({error: "The URL of the item is required."});

        return;
    }

    // create the new item...
    var newItem = await models.Item.create({
        title: request.body.title,
        url: request.body.url
    });
    
    // ..., then create the association between the user and the item...
    await request.user.addItem(newItem, {
        through: {
            comment: request.body.comment || "",
            rating: request.body.rating || 1
        }
    });

    // ..., finally get the composite item. because this is the m:n relationship
    // getItems() returns multiple rows, but we need only the first, the newly
    // created one.
    var item = (await request.user.getItems({where: {id: newItem.id}}))[0];

    // then send that composite item back as the response
    response.status(201).send(transformItem(item));
});

router.get("/:id/items/:itemId", findUser, async (request, response) => {
    var items = await request.user.getItems({
        where: {id: request.params.itemId}
    });

    if (!items)
    {
        return response.status(404).send({error: `No item with id ${request.params.itemId} was found.`});
    }

    response.status(200).send(transformItem(items[0]));
});

module.exports = router;
