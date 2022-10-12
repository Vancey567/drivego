const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshSchema = new Schema({
    token: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

module.exports = mongoose.model('Refresh', refreshSchema, 'tokens'); // Model Refresh, Schema to be used, Collection name(tokens) in mongodb