import {Button, Form, Input} from "antd";
import React from "react";

const {TextArea} = Input;


const Editor = ({onChange, activeReplyBox, onCancel, onSubmit, submitting, value}) => {
    return (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    {activeReplyBox === '' ? 'Add Comment' : 'Add Reply'}
                </Button>
                {activeReplyBox !== '' &&
                <Button style={{marginLeft:'1rem'}} onClick={onCancel} type='default'>
                    Cancel
                </Button>}
            </Form.Item>
        </div>
    );
}
export default Editor;
