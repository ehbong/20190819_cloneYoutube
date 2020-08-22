import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {
        
        axios.get('/api/video/getVideos')
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setVideo(res.data.videos)
                } else {
                    alert('비디오 가져오기를 실패 했습니다.');
                }
            })

    }, []);

    const renderCards = Video.map((obj, idx)=>{
        var minutes = Math.floor(obj.duration / 60);
        var seconds = Math.floor(obj.duration - (minutes * 60));

        return <Col key={idx} lg={6} md={8} xs={24}>
                <a href={`/video/post/${obj._id}`}>
                    <div style={{ position: 'relative' }}>
                        <img src={`http://localhost:5000/${obj.thumbnail}`} alt="video" style={{ width: '100%' }}/>
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                </a>
                <br />
                <Meta 
                    avatar={
                        <Avatar src={obj.writer.image} />
                    }
                    title={obj.title}
                    description=""
                />
                <span>{obj.writer.name}</span><br/>
                <span style={{ marginLeft: '3rem'}}>{obj.views} views</span> - <span>{moment(obj.createdAt).format("MM Do YY")}</span>
            </Col>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />

            <Row gutter={[16]}>
                {renderCards}
                
            </Row>
        </div>
    )
}

export default LandingPage
