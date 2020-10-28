import {Avatar, Comment} from "antd";
import React from "react";
import Editor from "../components/editor";

const EditorBlock = ({handleChange,activeReplyBox, handleSubmit, submitting, value,onCancel,name,img}) => {
    return (
        <Comment
            avatar={
                <Avatar src={img}/>
            }

            content={
                <Editor
                    onChange={handleChange}
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    value={value}
                    activeReplyBox={activeReplyBox}
                    name={name}
                    img={img}
                />
            }
        />
    );
}
export default EditorBlock;
