const tovoice =require('./tovoice');


var express=require('express');

// 创建一个路由对象，此对象将会监听api文件夹下的url
var router=express.Router();

router.use('/tovoice',tovoice);

module.exports=router;