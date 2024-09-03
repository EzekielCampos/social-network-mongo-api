const router = require('express').Router();

const apiRoutes = require('./api');
// Redirects to the User and Thought API routes
router.use('/api', apiRoutes);

module.exports = router;
