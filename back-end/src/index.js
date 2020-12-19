const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { forOwn } = require("lodash");

const {appConfig, dbConfig} = require("./config");

const routes = require("./routes");


mongoose
.connect(
    dbConfig.url, 
    {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => {
    console.log("Successfully connected to the database.");
}, (err) => { console.log(err); } );

const app = express();

app.use(cors({origin: appConfig.corsOrigin}));
app.use(express.json());

app.use(passport.initialize());

app.get("/", function(req, res) {
    console.log("requisição")
    res.send("Requisição!")
});

forOwn(routes, ( value, key ) => { app.use(`/api/${key}`, value) });


app.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port}`)
});