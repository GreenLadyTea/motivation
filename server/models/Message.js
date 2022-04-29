const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  receiver: {type: Schema.Types.ObjectId, ref: 'User'},
  text: {type: String, required: true},
}, { timestamps: true });

module.exports = model('Message', MessageSchema);
