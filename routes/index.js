var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});


router.get("/:id",(req,res)=>{
    res.render("send",{target:req.params.id});
});

module.exports = router;
