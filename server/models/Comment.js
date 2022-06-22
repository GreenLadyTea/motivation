const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  goal: {type: Schema.Types.ObjectId, ref: 'Goal'},
  text: {type: String, required: true},
}, { timestamps: true });

module.exports = model('Comment', CommentSchema);
