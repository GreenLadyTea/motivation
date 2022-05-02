const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    description: {type: String, required: false},
    avatar: {type: String, required: false},
    goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}],
    trackedGoals: [{ type: Schema.Types.ObjectId, ref: 'Goal'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = model('User', UserSchema);
