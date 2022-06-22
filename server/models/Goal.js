const { Schema, model } = require('mongoose');

const GoalSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  description: {type: String, required: true},
  term: {type: Date, required: true},
  status: {type: String, required: true},
  subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });

module.exports = model('Goal', GoalSchema);
