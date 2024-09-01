const { connect, connection } = require('mongoose');

connect('mongodb://127.0.01:27017/socialNewtworkThoughts');

module.exports = connection;
