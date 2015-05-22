var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var baseRouter = express.Router();

baseRouter.route('/')
  .get(function(req, res) {
      res.json({ message: 'While You Were Sleeping Twitter Bot.' });
  })


app.listen(port, function() {
  console.log("Node app is running at localhost:" + port);
})