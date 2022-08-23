const express = require('express');
const app = express();
const cors = require('cors');

//CREATE EXPRESS APP
app.use(express.json());
app.use(cors());
app.set("PORT", 1010);


module.exports = app;