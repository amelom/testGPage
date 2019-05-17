var express       = require('express');
var path          = require('path');
const config      = require(__dirname + '/config.js');
const app         = express();
const crmRegister = require('./controllers/crmRegisterController.js')


app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.url);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/crmRegister',crmRegister);

server = app.listen(process.env.PORT || config.express.port, function(){
    console.log('port '+config.express.port)
});