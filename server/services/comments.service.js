const commentsRepo = require('../repositories/comments.repository');
const {v4: uuidv4} = require('uuid');


const addComment = async (params) => {
    params.comment_id = uuidv4();
    params.time = parseInt(new Date().getTime() / 1000);
    params.status = 1;
    params.level += 1;
    let response = [];
    if (params.edit_id !== '')
        response = await commentsRepo.editComment(params);
    else
        response = await commentsRepo.addComment(params);
    if (response) {
        return {
            'status': 1,
            'message': 'Comment Added',
            comment: response
        };
    } else
        return {'status': 0, 'message': 'Comment could not be added.'};
};


const getComments = async (params) => {
    const response = await commentsRepo.getComments(params);

    if (response) {
        return {
            'status': 1,
            'message': 'Comments fetched',
            comments: response
        };
    } else
        return {'status': 0, 'message': 'Comments could not be fetched.'};
};


module.exports = {
    addComment,
    getComments
};
