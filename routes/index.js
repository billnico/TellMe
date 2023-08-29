var express = require('express');
var router = express.Router();

router.get('/:username', function(req, res, next) {
  //will fetch instagram profile info
  const user={
    profile:"source here"
  }
  res.render("index",{user:user});
});
router.get("/", function(req, res, next) {
  res.render("home");
});

router.get("/user/create",(req,res)=>{
    res.render("create");
});

router.get("/inbox/:username",(req,res)=>{
   res.render("inbox",{username:req.params.username});
});

router.get("/send/:username",(req,res)=>{
    res.render("send",{target:req.params.username});
});

module.exports = router;
