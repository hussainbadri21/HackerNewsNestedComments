import React, {Component} from 'react';
import EditorBlock from "./editorBlock";
import Editor from "./editor";
import moment from "moment-timezone";


class CommentBox extends Component {


    getCommentData = (parent, action) => {
        const {editorAction} = this.props;
        editorAction(parent, action);
    }

    render() {
        const {comment, name,img, activeReplyBox, value, submitting, handleChange, onCancel, handleSubmit, activeEditBox,uid} = this.props;
        return (
            <>
                <div className="comment-container f-d " key={uid} style={{marginLeft: `${((comment.level - 1) * 40)}px`}}>
                    <div className='left-container'>
                        <div
                            className="user-img bg-image"
                            style={{
                                backgroundImage: "url(" + comment.img + ")"
                            }}>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='user-details'>
                            <span className='user-name'>{comment.posted_by}</span>
                            <span className='post-time'>{moment(comment.time*1000).fromNow()}</span>
                        </div>
                        {activeEditBox !== comment.comment_id &&   <div className='comment-text'>
                            {comment.comment}
                        </div>}
                        {activeEditBox === comment.comment_id && <Editor
                            onChange={handleChange}
                            onCancel={onCancel}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                            activeEditBox={activeEditBox}
                        />}
                        <div className='actions'>
                            <span className='c-pointer' key="comment-basic-reply-to"
                                  onClick={() => this.getCommentData(comment, 'reply')}>Reply</span>
                            {uid===comment.uid && <span className='c-pointer' key="comment-basic-edit"
                                  onClick={() => this.getCommentData(comment, 'edit')}>Edit</span>}
                        </div>
                    </div>
                </div>
                {activeReplyBox === comment.comment_id &&
                <EditorBlock value={value}
                             submitting={submitting}
                             handleChange={handleChange}
                             onCancel={onCancel}
                             handleSubmit={handleSubmit}
                             activeReplyBox={activeReplyBox}
                             name={name}
                             img={img}
                />
                }
                <style jsx={"true"}>
                    {`
                .comment-container{
                    margin-bottom: 2rem;
                }
                .left-container .user-img{
                     height:40px;
                     width:40px;
                     position: relative;
                     top: 0;
                     flex-shrink: 0;
                     border-radius: 50%;
                 }
                 .right-container{
                    margin-left: 1rem;
                 }
                 .right-container .user-details .post-time{
                    color:#CCCCCC;
                    font-size: 12px;
                    margin-left: 0.5rem;                  
                 }
                 .right-container .user-details .user-name{
                   opacity: 0.4;
                   color:var(--carbon);
                   }
                 .right-container .comment-text{
                    color:var(--carbon);
                    margin-top: 0.2rem;
                  
                 }
                 .right-container .actions{
                     color: rgba(0,0,0,0.45);
                     margin-top: 0.8rem;
                     font-size: 12px;
                  }
                 .right-container span{
                    margin-right: 0.5rem;
                 }
                 
            `}
                </style>
            </>
        );
    }
}

export default CommentBox;
