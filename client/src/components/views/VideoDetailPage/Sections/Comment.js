import React, { useState, useEffect, Fragment } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const user = useSelector(state => state.user);
    

    const [CommentValue, setCommentValue] = useState("");

    const onChangeHandler = (e) => {
        setCommentValue(e.currentTarget.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let variable = {
            writer: user.userData._id,
            postId: props.postId,
            content: CommentValue
        }
        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data.result);
                    props.refreshFunction(res.data.result);
                    setCommentValue('');
                } else {
                    alert('코맨트 저장에 실패 했습니다.');
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />
            {/* Comment Lists */}
            {props.commentList && props.commentList.map((comment, idx)=> {
                return (!comment.responseTo &&
                <React.Fragment key={idx} >
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
                    <ReplyComment commentList={props.commentList} postId={props.postId} refreshFunction={props.refreshFunction} parentCommentId={comment._id}/>
                </React.Fragment>
                )
            })}

            {/* Root Comment Form */}
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
        </div>
    )
}

export default Comment
