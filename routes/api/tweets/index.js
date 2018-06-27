const models = require('../../../models');
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/test', (req, res) => {
    res.json('OK! :)');
});

router.get('/', (req, res) => {
    // models.Tweet.findAll().then((tweets) =>
    //     res.json({tweets}));

    models.Tweet.findAll({
        group:['Tweet.id'],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Like.post_id")), "likes_count"],
                [sequelize.fn("COUNT", sequelize.col("ReTweet.post_id")), "retweets_count"]
            ]
        },
        include: [{
            model: models.Engagement, attributes: [],
            where: {type: 1},
            as: 'Like',
        }, {
            model: models.Engagement, attributes: [],
            where: {type: 2},
            as: 'ReTweet'
        }]
    }).then((tweets) =>
        res.json({tweets}));
});

router.get('/retweets', (req, res) => {
    models.Engagement
        .findAll({include: [models.Tweet], where: {type: 2}})
        .then((retweets) =>
            res.json({retweets}));
});

router.post('/', (req, res) => {
    let username = req.body.username;
    let text_content = req.body.content;
    let timestamp = new Date();

    models.Tweet.create({username, text_content, timestamp}).then((tweet) =>
        res.status(201).json(tweet));
});

router.post('/:tweetId/like', (req, res) => createEngagement(req, res, 1));

router.post('/:tweetId/retweet', (req, res) => createEngagement(req, res, 2));

function createEngagement(req, res, type) {
    let post_id = req.params.tweetId;
    let username = req.body.username;
    let timestamp = new Date();

    models.Engagement.create({post_id, username, timestamp, type}).then((task) =>
        res.status(201).json(task));
}




module.exports = router;