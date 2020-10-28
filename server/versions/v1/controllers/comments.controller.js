const commentService = require("../../../services/comments.service");


const addComment = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const response = await commentService.addComment({...params, ...queryParams, ...bodyParams});
        return res.status(200).send(response);
    } catch (e) {
        // const error  = errorUtil.generateErrorObject(e);
        res.status(500).send(e.message);
    }
};

const addReply = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const response = await commentService.addReply({...params, ...queryParams, ...bodyParams});
        return res.status(200).send(response);
    } catch (e) {
        // const error  = errorUtil.generateErrorObject(e);
        res.status(500).send(e.message);
    }
};

const getComments = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const response = await commentService.getComments({...params, ...queryParams, ...bodyParams});
        return res.status(200).send(response);
    } catch (e) {
        // const error  = errorUtil.generateErrorObject(e);
        res.status(500).send(e.message);
    }
};

module.exports = {
    addComment,
    addReply,
    getComments
};
