const express = require('express');
const router = express.Router();
const FeedModel = require('../models/FeedModel')

router.post('/', (req, res)=>{ // /feed/...
    const formData = {
        username: req.body.username,
        comment: req.body.comment,
        tags: req.body.tags,
        image: req.body.image
    }

    const newFeed = new FeedModel(formData);

    newFeed
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});

router.post('/addlike', async (req, res)=>{
    
    let userLikes;
    let theFeedID = req.body.feedid;
    let userID = req.body.userid;

    // 1. Get the document with matching id
    let theDocument = await FeedModel
    .find({_id: theFeedID}) // promise
    .catch(err=>{
        res.send(err)
    })

    // 2. Extract the likes from the document
    userLikes = theDocument[0].likes;

    // 3. Push the new like to the array
    
    // If the user exists
    if(userLikes.includes(userID)) {
        userLikes.splice(
            userLikes.indexOf(userID), // position of userID in the array
            1 // number items we want to remove from the array
        );
    } else {
        userLikes.push(userID);
    }

    // 4. Update the document
    FeedModel
    .updateOne(
        {_id: theFeedID},
        {likes: userLikes}
    ) //promise
    .then(theFeed=>{
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    });
});

module.exports = router;