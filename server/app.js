const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./models/User.js');
require('./utils/passport.js');

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    Credential: true
    }
));

app.use(session({
    secret: 'YOUR_SECRET_IS _OUT',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const apiV1Routes = require("./routes/v1/");
app.use(apiV1Routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
