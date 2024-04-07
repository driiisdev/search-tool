const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true }, // Added trim to remove leading/trailing spaces
  email: { type: String, unique: true, required: true, trim: true, lowercase: true, match: /\S+@\S+\.\S+/ }, // Added lowercase and match for email format
  facebookId: { type: String, unique:true, required: true, trim: true }, // Added trim to remove leading/trailing spaces
});

module.exports = mongoose.model('user', userSchema);
