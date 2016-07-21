var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var apiRouter = express.Router();


app.use(express.static(path.join(__dirname, '../client')));
app.use('/api', apiRouter);

require('./apiRouter.js')(apiRouter);

app.listen(port, function () {
  console.log('Example app listening on port ', port);
});
