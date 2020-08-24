const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");


//=================================
//             likeDisLike
//=================================

router.post("/saveLike", (req, res) => {
    if(req.body.status){
        const like = new Like(req.body);
    
        like.save((err, doc) => {
                if(err) return res.status(400).send({ success: false, err });
                return res.status(200).json({ success: true, doc });
            })
    }else{
        let param = {};
        if(req.body.videoId){
            param = { "videoId": req.body.videoId, userId: req.body.userId };
        }else{
            param = { "commentId": req.body.commentId, userId: req.body.userId };
        }
        Like.remove(param, (err, doc) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, doc });
        })
    }
});

router.post("/getLikes", (req, res) => {
    if(req.body.videoId){
        Like.find({ 'videoId': req.body.videoId })
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, result});
        })
    }else{
        Like.find({ 'commentId': req.body.commentId })
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, result});
        })
    }
    
});

module.exports = router;