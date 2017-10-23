var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'portfolio'

});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM projects', function(err, rows, fields){
    if (err) throw err;
    res.render('dashboard',{
  "rows" : rows,
  layout: 'layout2'
});
});
  // res.render('index', { title: 'Express' });
});
router.get('/new', function(req, res, next){
  res.render('new');
});
module.exports = router;
