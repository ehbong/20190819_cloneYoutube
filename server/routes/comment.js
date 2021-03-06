const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");


//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, doc) => {
            if(err) return res.status(400).send({ success: false, err });

            Comment.find({'_id': doc._id})
                .populate('writer')
                .exec((err, result) => {
                    if(err) return res.status(400).send({ success: false, err });
                    return res.status(200).json({ success: true, result });
                })

        })
});

router.post("/getComments", (req, res) => {
    Comment.find({ 'postId': req.body.videoId })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, result});
        })
});

module.exports = router;