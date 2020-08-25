const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");


//=================================
//             likeDisLike
//=================================

router.post("/saveLike", (req, res) => {
    if(req.body.status){
        
        Like.find({ 'videoId': req.body.videoId, "userId": req.body.userId }) // 이미 좋아요를 기록이 있는지 확인
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            
            if(result.length == 0){  // 좋아요를 기록이 없을때만 좋아요 데이터 저장
                const like = new Like(req.body);
                
                like.save((err, doc) => {
                        if(err) return res.status(400).send({ success: false, err });
                        return res.status(200).json({ success: true, doc });
                    })
            }
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
router.post("/saveDislike", (req, res) => {
    if(req.body.status){
        Like.find({ 'videoId': req.body.videoId, "userId": req.body.userId })
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            if(result.length == 0){
                const dislike = new DisLike(req.body);
            
                dislike.save((err, doc) => {
                        if(err) return res.status(400).send({ success: false, err });
                        return res.status(200).json({ success: true, doc });
                    })
            }
        })
    }else{
        let param = {};
        if(req.body.videoId){
            param = { "videoId": req.body.videoId, userId: req.body.userId };
        }else{
            param = { "commentId": req.body.commentId, userId: req.body.userId };
        }
        DisLike.remove(param, (err, doc) => {
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
router.post("/getDislikes", (req, res) => {
    if(req.body.videoId){
        DisLike.find({ 'videoId': req.body.videoId })
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, result});
        })
    }else{
        DisLike.find({ 'commentId': req.body.commentId })
        .exec((err, result) => {
            if(err) return res.status(400).send({ success: false, err });
            return res.status(200).json({ success: true, result});
        })
    }
    
});

module.exports = router;