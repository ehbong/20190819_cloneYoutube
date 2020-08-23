const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
    console.log(res);
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename})
    })
});

router.post("/thumbnail", (req, res) => {
    console.log(res);
    // 썸네일 생성하고 비디오 러닝타임도 가져오기
    let thumbsFilePath ="";
    let fileDuration ="";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmpeg(req.body.url) // 파일경로
        .on('filenames', function (filenames) { // 파일이름 생성
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () { // 생성후 동작
            console.log('Screenshots taken');
            return res.json({ success: true, url: thumbsFilePath, fileDuration: fileDuration})
        })
        .on('error', function (err) { // 애러발생 동작
            console.log(err);
            return res.json({ success: false, err});
        })
        .screenshots({ // 썸네일 설정
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
        
});

router.post("/uploadVideo", (req, res) => {
    // 비디오 정보들을 DB에 저장
    const video = new Video(req.body);

    video.save((err, doc) => {
        console.log(err);
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});


router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                videos
            })
        })
});
router.post("/getSubscriptionVideos", (req, res) => {
    console.log(req.body);
    Subscriber.find({ 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send({ success: false, err });

            let subscribedUsers = [];
            subscribe.map((Subscriber, i) => {
                subscribedUsers.push(Subscriber.userTo);
            })

            Video.find({ writer: { $in: subscribedUsers}})
                .populate('writer')
                .exec((err, videos) => {
                    if(err) return res.status(400).json({success: false, err});
                    return res.status(200).json({
                        success: true,
                        videos
                    })
                })
        })

});
router.post("/getVideoDetail", (req, res) => {
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            console.log(video);
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                video
            })
        })
});

module.exports = router;
