const { Schema, model } = require('mongoose');

const GoalSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  description: {type: String, required: true},
  term: {type: String, required: true},
  status: {type: String, required: true},
  subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

module.exports = model('Goal', GoalSchema);
