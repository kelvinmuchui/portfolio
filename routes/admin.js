var express = require('express');
var router = express.Router();
var mysql = require("mysql");
//creating connection
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'portfolio'

});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM project2', function(err, rows, fields){
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
router.post('/new', function(req,res,next){
  //get Form Values
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var client = req.body.client;

  //check Image
  if(req.files && req.files.projectimage){
    var projectImageOriginalName = req.files.projectimage.originalname;
    var projectImageName         = req.files.projectimage.name;
    var projectImageMime         = req.files.projectimage.mimetype;
    var projectImagePath         = req.files.projectimage.path;
    var projectImageExt          = req.files.projectimage.extension;
    var projectImageSize         = req.files.projectimage.size;

  }else{
    var projectImageName = 'noimage.jpg';
  }
  //Form field validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('service','Service field is requierd').notEmpty();

  var errors = req.validationErrors();
  if (errors){
    res.render('new',{
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client
    });
      }else{
      var project = {
        title: title,
        description: description,
        service: service,
        client: client,
        image: projectImageName
      };

  var query = connection.query('INSERT INTO project2 SET ?', project, function(err, result){
    //project Inserted


  });
  req.flash('success','Project added');
  res.location('/admin');
  res.res.redirect('/admin');
  }
});

/* GET home page. */
router.get('/edit/:id', function(req, res, next) {

  connection.query('SELECT * FROM project2 WHERE id = '+req.params.id, function(err, row, fields){
    if (err) throw err;
    res.render('edit',{
  "row" : row[0],
  layout: 'layout2'
});
});
  // res.render('index', { title: 'Express' });
});
router.post('/edit/:id', function(req,res,next){
  //get Form Values
  var title = req.body.title;
  var description = req.body.description;
  var service = req.body.service;
  var client = req.body.client;

  //check Image
  if(req.files && req.files.projectimage){
    var projectImageOriginalName = req.files.projectimage.originalname;
    var projectImageName         = req.files.projectimage.name;
    var projectImageMime         = req.files.projectimage.mimetype;
    var projectImagePath         = req.files.projectimage.path;
    var projectImageExt          = req.files.projectimage.extension;
    var projectImageSize         = req.files.projectimage.size;

  }else{
    var projectImageName = 'noimage.jpg';
  }
  //Form field validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('service','Service field is requierd').notEmpty();

  var errors = req.validationErrors();
  if (errors){
    res.render('new',{
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client
    });
      }else{
      var project = {
        title: title,
        description: description,
        service: service,
        client: client,
        image: projectImageName
      };

  var query = connection.query('UPDATE project2 SET ? WHERE id ='+req.params.id , project, function(err, result){
    //project Inserted


  });
  req.flash('success','Project updated');
  res.location('/admin');
  res.res.redirect('/admin');
  }
});


router.delete('/delete/:id', function(req, res){
  connection.query('DELETE FROM project2 WHERE id = '+ req.params.id, function(err, result){
    if(err) throw err;
  });
  req.flash('success','Project Deleted');
  res.location('/admin');
  res.res.redirect('/admin');
});
module.exports = router;
