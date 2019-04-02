const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();
let routes = require('./routes/index.js');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(500).send({
    "Error": err.stack
  });
});
app.set('port', process.env.PORT || 8000 );
app.listen(app.get('port') , function(){
console.log('Server started on port : '+ app.get('port'));
});

module.exports = router;