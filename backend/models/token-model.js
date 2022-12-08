const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 }
}, {timestamps: true});

module.exports = mongoose.model('Token', tokenSchema, 'tokens'); // Model, Schema to be used, Collection name(tokens)