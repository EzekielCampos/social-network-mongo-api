const express = require('express');

const app = express();

const routes = require('./routes');
// Establishes connection to database
const db = require('./config/connection');

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Redirecte to api routes
app.use(routes);

// This will make the connection to the database
db.once('open', () => {
  // Starts the server once the db is set
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
