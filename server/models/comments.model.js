const mongoose = require("mongoose");
const {con_pj} = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const commentsSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        comment_id: {
            type: String,
        },
        thread_id: {
            type: String,
        },
        posted_by: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        time:{
            type: Number,
        },
        status:{
            type: Number,
        },
        parent_id:{
            type: String,
            default: ''
        },
        level:{
            type: Number,
            required: true
        } ,
        uid:{
            type: Number,
            required: true
        }
    },
    {versionKey: false}
);

module.exports = Vision = con_pj.model("comment", commentsSchema);
