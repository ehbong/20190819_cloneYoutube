import React, { useEffect, useState} from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';

function VideoDetailPage(props) {

    const [Video, setVideo] = useState({});
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

    if(Video.writer){
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls/>
                        <List.Item 
                            actions
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
    
                </Col>
    
                <Col lg={6} xs={24}>
                
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
