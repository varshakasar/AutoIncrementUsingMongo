const express = require('express');
const mongoose = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");
const router = express.Router();
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
//handle mongodb error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to DataBase...");
});
let countSchema = require('../countSchema.js');

let Count = mongoose.model('studentDetail', countSchema);

router.get('/student',(req,res,next) => {
  Count.find({}).exec((err,result) => {
    if(err)return next(err);
    return res.json({
        success:true,
        data:result
      })
  })
})

router.post('/student',(req,res,next) => {
  autoIncrement.getNextSequence(db,'studentDetail',(err,autoindex) => {
    var obj = new Count({
      name:req.body.name,
      studid:autoindex
    })
    obj.save((err,data) => {
      if(err) return next(err);
      return res.json({
        success:true,
        data:data
      })
    })
  })
})
module.exports = router;