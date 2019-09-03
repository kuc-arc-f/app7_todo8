var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Todos/index', {});
});

router.get('/new', function(req, res, next) {
    res.render('Todos/new', {});
});

router.get('/show/:id', function(req, res) {
    console.log(req.params.id  );
    res.render('Todos/show', {"params_id": req.params.id });
});

router.get('/edit/:id', function(req, res) {
    console.log(req.params.id  );
    res.render('Todos/edit', {"params_id": req.params.id });
});

module.exports = router;
