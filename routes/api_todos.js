var express = require('express');
var router = express.Router();
//var ObjectID = require('mongodb').ObjectID;
var sqlite3 = require('sqlite3')
var dbfileName = "./app1.sqlite"

/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index', function(req, res) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    var sql = "SELECT id,title, content, complete,date(up_date, '+9 hours') as up_date"
        sql +=" FROM todos order by id desc;"
console.log(sql);
    db.serialize(function() {
        db.all(sql , function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
//                console.log(item );
            });
            var param = {"docs": items };
            res.json(param);
        });
    });
    db.close();
});
/******************************** 
*  
*********************************/
router.post('/new', (req, res) => {
    data = req.body
    data.up_date = new Date();
    var db = new sqlite3.Database( dbfileName )
//    var items = []
    var sql = "INSERT INTO todos (title, content,complete, up_date) VALUES (?, ?, ? , CURRENT_TIMESTAMP)"
    db.serialize(function() {
        var stmt = db.prepare(sql)
        stmt.run(
            data.title, 
            data.content,
            data.complete,
        )
        stmt.finalize()
        res.json(data);
    });
    db.close();
//    res.json(data);
    console.log(req.body.title )
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
    var db = new sqlite3.Database( dbfileName )
    var sql = "SELECT id,title, content, complete,up_date FROM todos where id="+req.params.id
//console.log(sql);
    db.serialize(function() {
        db.all(sql, function(err, rows) {
           var param = {"docs": rows };
            res.json(param);
        });
    });
    db.close();

});
/******************************** 
* update
*********************************/
router.post('/update', (req, res) => {
    data = req.body
//    console.log(req.body )  
    var db = new sqlite3.Database( dbfileName )
    var sql = "update todos set title= ?, content =?, complete=? where id= ?"
    db.serialize(function() {
        var stmt = db.prepare( sql )
        stmt.run(
            data.title, 
            data.content ,
            data.complete ,
            req.body.id
        )
        stmt.finalize()
        res.json(data);
    });
    db.close();
});
/******************************** 
* delete
*********************************/
router.get('/delete/:id', function(req, res) {
    var db = req.db;
    var db = new sqlite3.Database( dbfileName )
    db.serialize(function() {
        var stmt = db.prepare('delete from todos where id= ?')
        stmt.run(req.params.id )
        stmt.finalize()   
        res.json({id : req.params.id})
    });
    db.close();
});

module.exports = router;
