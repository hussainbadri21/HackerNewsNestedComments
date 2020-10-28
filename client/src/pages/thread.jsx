import React, {Component} from 'react';
import Navbar from "../components/header/Navbar";
import {Button, message} from 'antd';
import 'antd/dist/antd.css'
import EditorBlock from "../components/editorBlock";
import * as Constants from "../constants/constants";
import axios from "axios";
import CommentBox from "../components/commentBox";


class AddComments extends Component {
    //List of Users
    users = [
        {
            id: 1,
            name: 'George Bluth',
            img: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
        },
        {
            id: 2,
            name: 'Janet Weaver',
            img: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'
        },
        {
            id: 3,
            name: 'Emma Wong',
            img: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg'
        },
        {
            id: 4,
            name: 'Eve Holt',
            img: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
        },
        {
            id: 5,
            name: 'Charles Morris',
            img: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'
        },
    ]
    //List of thread questions
    threads=["Why are ML developers leaving TensorFlow for Pytorch?","Do wealthy Americans discuss inequality to make themselves feel better?","Why can't nuclear waste be launched into the sun?","How are Digital Nomads coping with travel restrictions?","Why isn’t finance a part of the core curriculum at schools?"]
    index = Math.floor(Math.random() * 4) + 1;

    state = {
        comments: [],
        submitting: false,
        value: '',
        activeReplyBox: '',
        activeEditBox: '',
        level: 0,
        uid: this.users[this.index].id,
        name: this.users[this.index].name,
        img: this.users[this.index].img,
        thread: 1
    };

//Fetches all comments of a thread
    getThreadData = (thread) => {
        axios.get(Constants.G_API_URL + 'comment/', {params: {thread_id: thread}})
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    let comments = []
                    for (let comment of Object.values(res.comments)) {
                        comments.push(comment)
                    }
                    this.setState({
                        comments: comments
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getThreadData(1);
    }

    //For editing and replying to comments
    editorAction = (parent, action) => {
        if (action === 'reply')
            this.setState({activeReplyBox: parent.comment_id, level: parent.level === undefined ? 0 : parent.level})
        else if (action === 'edit')
            this.setState({activeEditBox: parent.comment_id, value: parent.comment})
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    onCancel = () => {
        this.setState({
            value: '',
            activeReplyBox: '',
            activeEditBox: ''
        });
    }

    displayComments = (comments) => {
        const {submitting, value, activeReplyBox, activeEditBox, name, img, uid} = this.state;

        let commentArr = []
        for (let comment of Object.values(comments)) {
            commentArr.push(<CommentBox
                comment={comment}
                editorAction={this.editorAction}
                editComment={this.editComment}
                activeReplyBox={activeReplyBox}
                value={value}
                submitting={submitting}
                handleChange={this.handleChange}
                onCancel={this.onCancel}
                handleSubmit={this.handleSubmit}
                activeEditBox={activeEditBox}
                name={name}
                img={img}
                uid={uid}
            />)
            if (comment.children && Object.keys(comment.children).length > 0) {
                let replies = this.displayComments(comment.children)
                commentArr = commentArr.concat(replies)
            }
        }
        return commentArr
    }


    handleSubmit = () => {
        const {value, activeReplyBox, activeEditBox, level, name, img, uid, thread} = this.state
        if (!value) {
            message.warning('Please type your reply before submitting!');
            return;
        }

        this.setState({
            submitting: true,
        });

        axios.post(Constants.G_API_URL + 'comment/', {
            thread_id: thread,
            parent_id: activeReplyBox,
            posted_by: name,
            img: img,
            comment: value,
            level: level,
            edit_id: activeEditBox,
            uid: uid
        })
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    this.setState({
                        submitting: false,
                        value: '',
                        activeReplyBox: '',
                        activeEditBox: '',
                    });
                    this.getThreadData(thread);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeUser = () => {
        let i = Math.floor(Math.random() * 4) + 1;
        this.setState({
            name: this.users[i].name,
            img: this.users[i].img,
            uid: this.users[i].id
        });
    }

    changeThread=()=>{
        let thread=  Math.floor(Math.random() * 5) + 1;
        console.log(thread)
        this.setState({thread:thread});
        this.getThreadData(thread);
}


    render() {
        const {comments, submitting, value, activeReplyBox, name, img,thread} = this.state;
        return (
            <>
                <Navbar name={name} img={img} changeUser={this.changeUser}/>
                <div className="body-container">
                    <div className='f-d f-h-e'>
                        <Button className='change-thread-btn'
                                onClick={this.changeThread }>Change
                            Thread</Button>
                    </div>
                    <div className='thread-question'>{this.threads[thread-1]}</div>
                    {this.displayComments(comments)}
                    {activeReplyBox === '' &&
                    <EditorBlock value={value}
                                 name={name}
                                 img={img}
                                 submitting={submitting}
                                 handleChange={this.handleChange}
                                 activeReplyBox={activeReplyBox}
                                 handleSubmit={this.handleSubmit}/>}
                </div>
                <style jsx={"true"}>
                    {`
                      .body-container{
                         padding-left: 5rem;
                         padding-right: 5rem;
                         margin-top: 100px;
                      }
                      .ant-list-item{
                      display: block!important;
                      }
                      
                      .thread-question{
                          font-size: 18px;
                        margin-bottom: 2rem;
                        border-bottom: 1px solid rgba(0,0,0,0.65);
                        padding-bottom: 4rem;
                      }
                      
                      .body-container .upload-btn{
                         display: flex; 
                         align-items: center                      
                      }
                      .body-container .vision-table{
                          margin-top: 2rem;
                      }
                      .body-container .upload-btn:hover,.body-container .upload-btn:focus,.body-container .upload-btn:active,.body-container .upload-btn.active{
                          color: var(--purple);
                          border-color: var(--purple);
                      }
                       .body-container .deactivate-btn:hover, .body-container .deactivate-btn:focus{
                         color: var(--purple);
                         background-color: var(--dove)!important;

                      }
                      .body-container  .deactivate-btn {
                           background-color: var(--purple);
                           border-color: var(--purple);
                        }
                         .body-container  .export-data-btn{
                            margin-top: 1rem;
                            width: 100%;
                            height: 35px!important;
                        }
                        .vision-table-span{
                            font-weight: bold;
                           
                        }
                        .ant-table-row-cell-break-word,.vision-big-row{
                          font-family: 'OpenSans';
                        }
                        .body-container .change-thread-btn{
                           margin-left: 1rem;
                           margin-bottom: 2rem;
                        }                     
                        
                    `}
                </style>
            </>
        );
    }
}

export default AddComments;
