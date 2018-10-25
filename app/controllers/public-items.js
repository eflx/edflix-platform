const express = require("express");

const models = require("../models");

// router for /api/v1/items
const router = express.Router();

const items = [
    {
        title: "Building and securing a modern backend API",
        url: "https://getpocket.com/a/read/1383957649",
        tags: ["api", "auth", "node", "nodejs", "scotch"],
        subject: "Science",
        rating: 4
    },
    {
        title: "Anthropic arrogance",
        url: "https://getpocket.com/a/read/2326562918",
        tags: ["philosophy", "physics", "science", "universe", "aeon"],
        subject: "Philosophy",
        rating: 5
    },
    {
        title: "So it's nature not nurture after all?",
        url: "https://www.theguardian.com/science/2018/sep/29/so-is-it-nature-not-nurture-after-all-genetics-robert-plomin-polygenic-testing",
        tags: ["genetics", "guardian", "science", "nature"],
        subject: "Science",
        rating: 3
    },
    {
        title: "12 books that made me think",
        url: "https://medium.com/the-mission/12-books-that-made-me-think-b322db3e151a",
        tags: ["medium", "books"],
        subject: "Social Studies",
        rating: 4
    },
    {
        title: "What makes you \"click\" with someone else?",
        url: "https://www.bakadesuyo.com/2012/10/what-makes-you-click-with-someone-else/",
        tags: ["emotional intelligence", "friendship", "social", "vulnerability"],
        subject: "Social Studies",
        rating: 5
    },
    {
        title: "How Einstein learned physics",
        url: "https://www.bakadesuyo.com/2012/10/what-makes-you-click-with-someone-else/",
        tags: ["education", "science", "physics"],
        subject: "Science",
        rating: 5
    }
];

router.get("/", async (request, response) => {
    var result = await models.Item.findAll();

    response.send({items: result});
});

router.post("/", async (request, response) => {
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

    var item = await models.Item.create({
        title: request.body.title,
        url: request.body.url
     });

     response.status(201).send({item: item});
});

module.exports = router;
