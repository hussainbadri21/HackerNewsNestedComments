const commentsModel = require("../models/comments.model");

const addComment = async (data) => {
    try {
        const save_details = new commentsModel(data);
        return await save_details.save();
    } catch (e) {
        console.log(e);
    }
};

const addReply = async (data) => {
    try {
        const save_details = new commentsModel(data);
        return await save_details.save();
        // return await commentsModel.updateOne({comment_id: data.comment_id, status: 1}, {$push: {replies: data}});
    } catch (e) {
        console.log(e);
    }
};

const getComments = async (data) => {
    try {
        const comments = await commentsModel.find({thread_id: data.thread_id, status: 1}).lean();
        let res = {};
        comments.forEach((v, k) => {
            v.children = {};
            if (v.parent_id === '') {
                res[v.comment_id] = v;
                return;
            }
            parse_children(res, v)
        })
        return res;
    } catch (e) {
        console.log(e);
    }
};

const parse_children = (data, comment) => {
    for (const [k, v] of Object.entries(data)) {
        if (k === comment.parent_id) {
            v.children[comment.comment_id] = comment;
            return;
        }
        if (v.children) {
            parse_children(v.children, comment)
        }
    }
}

const editComment = async (data) => {
    try {
    return await commentsModel.updateOne({'comment_id':data.edit_id,thread_id: data.thread_id, status: 1},{$set:{comment:data.comment}})
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    addComment,
    addReply,
    getComments,
    editComment
};
