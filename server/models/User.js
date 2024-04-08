const mongoose = require('mongoose');
const { serializeUser } = require('passport')
const { Schema } = mongoose;

// schema for user collection(table)
// Added trim to remove leading/trailing spaces
// Added lowercase and match for email format
const userSchema = new Schema({
  name: { type: String, required: true, trim: true }, 
  email: { type: String, unique: true, required: true, trim: true, lowercase: true, match: /\S+@\S+\.\S+/ }, 
  facebookId: { type: String, unique:true, required: true, trim: true },
});

module.exports = mongoose.model('User', userSchema);
