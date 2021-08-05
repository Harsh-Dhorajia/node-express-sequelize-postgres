const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./server/models');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
require('dotenv').config()

require("./server/routes")(app);
app.get("*", (req, res) =>
    res.status(200).send({
        message: "Welcome to the beginning of nothingness.",
    })
);
// dbConnection()
db.sequelize.sync()
    .then(async () => {
        app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT))
        console.log('DB connection established')
    });