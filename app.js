const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const dash = require('./web/routes/dash');
const pages = require('./web/routes/pages');

const users = require('./api/routes/users');
const contacts = require('./api/routes/contacts');
const lists = require('./api/routes/lists');
const communications = require('./api/routes/communications');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web/views'));


// Config middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Static Pages
app.use('/assets', express.static(path.join(__dirname, 'web/assets/')));

// web routes
app.use('/', pages);
app.use('/dash', dash);

//api routes
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/lists', lists);
app.use('/api/com', communications);

app.use('*', (req, res) => {
    res.status(404).json({ message: "NOT FOUND" });
});

// Handling errors
app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: "error"
    });
});

module.exports = app;
