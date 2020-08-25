import React, { useEffect, useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);

    const onChangeHandler = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onclickReplyOpen = (e) => {
        setOpenReply(!OpenReply);
    }

    const actions = [
        <span onClick={onclickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let variable = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }
        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    props.refreshFunction(res.data.result);
                    setCommentValue('');
                    setOpenReply(!OpenReply);
                } else {
                    alert('코맨트 저장에 실패 했습니다.');
                }
            })
    }
    const LikeDislikesButton = props.comment.writer._id !== user.userData._id && <LikeDislikes commentId={props.comment._id} />;
    return (
        <div>
            <Comment 
                actions={[actions, LikeDislikesButton]}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="profileImage" />}
                content={<p>{props.comment.content}</p>}
            />
            {
                OpenReply &&
                <form style={{ display: 'flex'}} onSubmit={onSubmitHandler}>
                    <textarea 
                        style={{ width: '100%', borderRadius: '5px'}}
                        onChange={onChangeHandler}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br/>
                    <button style={{ width: '20%', height: '52px' }} onSubmit={onSubmitHandler}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
