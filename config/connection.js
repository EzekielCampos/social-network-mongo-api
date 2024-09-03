const { connect, connection } = require('mongoose');

// Establishes connection the database
connect('mongodb://127.0.01:27017/socialNewtworkThoughts');

module.exports = connection;
