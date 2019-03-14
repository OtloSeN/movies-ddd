const db = require('./db');
const startup = require('./startup');

module.exports = app => {
    db();
    startup(app);
};