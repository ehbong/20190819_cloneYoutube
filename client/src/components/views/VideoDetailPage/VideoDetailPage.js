import React, { useEffect, useState} from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

function VideoDetailPage(props) {

    const [Video, setVideo] = useState({});
    const [Comments, setComments] = useState([]);
    const videoId = props.match.params.videoId;
    const variable = { "videoId": videoId};

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setVideo(res.data.video)
                } else {
                    alert('비디오 가져오기를 실패 했습니다.');
                }
            })
    }, []);

    useEffect(() => {
        Axios.post('/api/comment/getComments', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setComments(res.data.result);
                } else {
                    alert('코멘트 리스트 가져오기를 실패 했습니다.');
                }
            })
    }, []);

    

    const refreshFunc = (newComment) => {
        setComments(Comments.concat(newComment));
    }


    if(Video.writer){

        const subscribeButton = Video.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem("userId")} />

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls/>
                        <List.Item 
                            actions={[<LikeDislikes videoId={videoId} />, subscribeButton]}
                        >
                            <List.Item.Meta 
                                avatar={
                                    <Avatar src={Video.writer.image} />
                                }
                                title={Video.writer.name}
                                description={Video.description}
                            />
                        </List.Item>       
                    </div>
                    
                    <Comment refreshFunction={refreshFunc} commentList={Comments} postId={videoId} />
                </Col>
    
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
    
            </Row>
        )
    } else{
        return (
            <div>
                Loading...
            </div>
        )
    }
    
}

export default VideoDetailPage
