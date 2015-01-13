var express = require('express');
var bodyParser = require('body-parser');
var health = require('express-ping');

var app = express();

app.use(bodyParser.json());
app.use(health.ping());

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

var router = express.Router();
router.use('/stores', require('./routers/stores'));

app.use('/api/v1', router);

app.listen(3000, function() {
    console.log('Server starts on port: 3000');
});
