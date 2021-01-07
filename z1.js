const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.static('public/public-html-css'));
app.use(express.static('public/public-javascript'));

app.listen(3000);