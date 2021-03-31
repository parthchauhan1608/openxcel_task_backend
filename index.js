require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const user = require('./User/route');
const topic = require('./Topic/route');
const post = require('./post/route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/topic', topic);
app.use('/post', post);


mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch((err) => {
    console.log({ err });
    process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));