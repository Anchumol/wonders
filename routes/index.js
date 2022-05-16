var express = require('express');
var router = express.Router();
var con = require('../config/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/userLogin', function(req, res, next) {
  res.render('userLogin');
});
router.get('/userReg', function(req, res, next) {
  res.render('userReg');
});
router.post('/userReg', function(req, res, next) {
  var sql = "insert into user set ?"
  con.query(sql,req.body,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      req.session.user=result[0];
      res.redirect('/userLogin')
    }
  })
});
router.post('/userLogin',(req,res)=>{
  var sql = "select * from user where email = ? and password = ? and status = 'unblocked'"
  console.log(req.body.mail)
  con.query(sql,[req.body.mail,req.body.password],(err,row)=>{
    if(err){
      console.log(err);
    }else{
      if(row.length > 0){
        req.session.user = row[0];
        var user = req.session.user;
        console.log("successfully looged in");
        res.render('userHome',{user})
      }else{
        console.log("password or mail incorret");
        res.redirect('/userLogin')
      }
    }
  })
})
router.get('/home',(req,res)=>{
  var user = req.session.user;
  res.render('userHome',{user})
})
module.exports = router;
