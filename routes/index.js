var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});


router.get("/:username",(req,res)=>{
    res.render("send",{target:req.params.username});
});

module.exports = router;
