var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("index");
  
});

router.get("/create",(req,res)=>{
    res.render("create");
});

router.get("/send/:username",(req,res)=>{
    res.render("send",{target:req.params.username});
});

module.exports = router;
