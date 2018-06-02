const express = require('express');
const app = express();

app.use("/", express.static('client'));
app.use("/libs", express.static('bower_components'));

app.listen(4200, () => {
    console.log("APP STARTED ON PORT 4200");
})