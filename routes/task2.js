var express = require('express');
var router = express.Router();

/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
//  res.send('respond with a resource-1234');
  res.render('task2/index', {});
});
/******************************** 
* 
*********************************/
router.get('/new', function(req, res, next) {
    res.render('task2/new', {});
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('task2/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id  );
      res.render('task2/edit', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('task2/test4', {});
});

module.exports = router;
