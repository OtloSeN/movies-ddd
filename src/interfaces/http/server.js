const express = require('express');

const start = () => {
    const app = express();
    const router = require('./router');
    
    //middleware
    require('./middleware')(app);
    //routes
    app.use('/', router);
    

    app.listen(3000, () => console.log('Server is running on port 3000'));
};

module.exports = { start };