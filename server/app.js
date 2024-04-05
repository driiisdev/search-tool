require('dotenv').config();
const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');

const app = express();
connectDB();
const apiV1Routes = require("./routes/v1/")

app.use(
    cors({ 
        origin: "*", 
        credentials: true,
        methods: "GET,PUT,PATCH,POST,DELETE",
    })
);
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api/v1", apiV1Routes)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
