const   express = require('express'),
        bodyParser = require('body-parser'),
        app = express(),
        api = require('./api'),
        mongoose = require('mongoose'),
        env = require('../.env'),
        mongoDbConnString = `mongodb://${env.MONGO_USER}:${env.MONGO_PWD}@${env.MONGO_DB_HOST}:${env.MONGO_DB_PORT}/${env.MONGO_DB_NAME}`;

let db;

console.log(mongoDbConnString);
mongoose.connect(mongoDbConnString);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ready);

function ready() {
    app.use("/", express.static('client'));
    app.use("/libs", express.static('bower_components'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/api", api);

    app.listen(4200, () => {
        console.log("APP STARTED ON PORT 4200");
    })  
};

