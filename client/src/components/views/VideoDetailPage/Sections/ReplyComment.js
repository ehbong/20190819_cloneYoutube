import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    console.log("ReplyComment");
    console.log(props);
    const [OpenReplyComment, setOpenReplyComment] = useState(false);
    const [MoreComment, setMoreComment] = useState(0);

    useEffect(()=>{

        let commentCount = 0;
        props.commentList.map((comment, idx) => {
            if(comment.responseTo === props.parentCommentId) commentCount++;
        });
        setMoreComment(commentCount)
    }, [props.commentList, props.parentCommentId]);
    
    const renderReplyComment = (parentCommentId) => {
        return props.commentList.map((comment, idx) => {
            return <React.Fragment  key={idx}>
            { comment.responseTo === parentCommentId &&
                <div style={{ width: '80%', marginLeft: '40px' }}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
                    <ReplyComment commentList={props.commentList} refreshFunction={props.refreshFunction} postId={props.postId} parentCommentId={comment._id}/>
                </div>
            }
            </React.Fragment>
        })
    }

    const onReplyCommentHandler = (e) => {
        setOpenReplyComment(!OpenReplyComment);
    }

    return (
        <div>
            {MoreComment > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onReplyCommentHandler}>
                View {MoreComment} more comment(s)
            </p>
            }
            {OpenReplyComment && renderReplyComment(props.parentCommentId)}
        </div>
        )
}

export default ReplyComment
