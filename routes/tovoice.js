var express = require('express');
const router = express.Router();
router.get('/',function(req,res,next){
      return res.send({
        status:0,
        errorMessage:'提交的字段不全',
        errorCode:10001,
        success:false,
      });

});


module.exports = router;