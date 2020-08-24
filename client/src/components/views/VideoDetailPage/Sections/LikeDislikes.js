import React, { useState, useEffect } from 'react';
import { Tooltip} from 'antd';
import { useSelector } from 'react-redux';
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {
    const user = useSelector(state => state.user);

    const [LikeStatus, setLikeStatus] = useState(false);
    const [DislikeStatus, setDislikeStatus] = useState(false);
    const [LikeCount, setLikeCount] = useState(0);
    const [DislikeCount, setDislikeCount] = useState(0);

    let variable;
    if(props.videoId){
        variable = { "videoId": props.videoId, userId: user.userData._id }
    }else{
        variable = { "commentId": props.commentId, userId: user.userData._id }
    }

    const onLikeHandler = ()=>{
        if(!LikeStatus) { // 좋아요 상태로 전환할때
            setDislikeStatus(false);
            variable.status = true;
        }
        console.log(variable);
        Axios.post('/api/likeDisLike/saveLike', variable)
        .then(res => {
            if(res.data.success){
                console.log(res.data);
            } else {
                alert('좋아요 상태 적용을 실패 했습니다.');
            }
        })
        setLikeStatus(!LikeStatus);
    }
    const onDislikeHandler = ()=>{
        if(!DislikeStatus) { // 싫어요 상태로 전환할때
            setLikeCount(LikeCount-1);
            setDislikeCount(DislikeCount+1);
            setLikeStatus(false);
        }
        setDislikeStatus(!DislikeStatus);
    }

    


    useEffect(() => {
        console.log(variable);
        Axios.post('/api/likeDisLike/getLikes', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setLikeCount(res.data.result.length);
                    setLikeStatus(!!res.data.result.find((obj)=>obj.userId == user.userData._id));
                } else {
                    alert('좋아요 리스트 가져오기를 실패 했습니다.');
                }
            })
    }, [LikeStatus, DislikeStatus]);

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {!LikeStatus && <LikeOutlined 
                        onClick={onLikeHandler} />}
                    {LikeStatus && <LikeFilled 
                        onClick={onLikeHandler} />}
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{LikeCount}</span>
                </Tooltip>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {!DislikeStatus && <DislikeOutlined onClick={onDislikeHandler} />}
                    {DislikeStatus && <DislikeFilled onClick={onDislikeHandler} />}
                    <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DislikeCount}</span>
                </Tooltip>
            </span>
        </div>
    )
}

export default LikeDislikes
