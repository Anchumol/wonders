var express = require('express');
var router = express.Router();
var con = require('../config/config')
/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('adminLogin')
});
router.post('/adminLogin', function(req, res, next) {
  var userName = "admin"
  var password = "admin"
  if(req.body.user == userName && req.body.password == password){
    res.redirect('/users/admin')
  }else{
    res.redirect('/users/')
  }
  ;
});
router.get('/admin', function(req, res, next) {
  var sql = "select * from user"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{

      res.render('admin',{result})
    }
  })
 
  });

  router.get('/block/:id', function(req, res, next) {
    var id  = req.params.id;
    var sql = "update user set status = 'blocked' where id = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/users/admin')
      }
    })
   
    });

    router.get('/unblock/:id', function(req, res, next) {
      var id  = req.params.id;
      var sql = "update user set status = 'unblocked' where id = ?"
      con.query(sql,[id],(err,result)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/users/admin')
        }
      })
     
      });
module.exports = router;
