require("dotenv").config();

const models = require("./models");

async function main()
{
    /*
    var user1 = new models.User({name: "Rohit", email: "rohit.mohan@null.net"});
    user1 = await user1.save();

    var oldBollywoodSongsCollection = new models.Collection({title: "Old Bollywood Songs"});
    oldBollywoodSongsCollection = await oldBollywoodSongsCollection.save();

    var x = await user1.addCollection(oldBollywoodSongsCollection);
    console.log(x);

    await user1.save();
    */

    var user2 = new models.User({name: "Siddharth", email: "sid0@example.com"});
    var user2 = await user2.save();
    
    var khanAcademyCollection = new models.Collection({title: "Khan Academy", user_id: user2.id});
    khanAcademyCollection = await khanAcademyCollection.save();

    var video1 = new models.Item({title: "Algebra 1", url: "https://algebra1.ka.com/1"});
    video1 = await video1.save();

    var video2 = new 
    /*
    khanAcademyCollection = await user2.addCollection(khanAcademyCollection);
    khanAcademyCollection = await khanAcademyCollection.save();
    */

    /*
    var khanAcademyCollection = await user1.addCollection({title: "Khan Academy"});
    khanAcademyCollection = await khanAcademyCollection.save();

    user2 = await user2.save();

    await user2.addCollection(khanAcademyCollection);
    user2 = await user2.save();

    var user1sCollections = await user1.getCollections();
    for (var c in user1sCollections)
    {
        console.log(c.title);
    }
    */
}

main();
