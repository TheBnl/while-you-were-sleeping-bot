var express = require('express');
var app = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;

var baseRouter = express.Router();
app.use('/', baseRouter);

baseRouter.route('/')
  .get(function(req, res) {
      res.json({ message: 'Hello, this is the While You Were Sleeping Twitter Bot.' });
  })

app.listen(port, function() {
  console.log("Node app is running at localhost:" + port);
})