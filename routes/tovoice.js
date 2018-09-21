var express = require('express');
const router = express.Router();
var axios = require('axios');
var md5 = require('blueimp-md5');
var Base64 = require('js-base64').Base64; 
   
    function curTime () {
      return Date.parse(Date()).toString().substr(0, 10)
      }
    function paramsBase64 () {
        let param={
            'auf': 'audio/L16;rate=16000',
            'aue': 'raw',
            'voice_name': 'xiaoyan',
            'speed': '50',
            'volume': '50',
            'pitch': '50',
            'engine_type': 'intp65',
            'text_type': 'text'
          }
        return  Base64.encode(JSON.stringify(param))
    }
    function checkSum () {
        const apiKey = '8d9400299d78c5ab793d26ac07643867'
        return md5(apiKey + curTime() + paramsBase64())
    }
    function IP (reqOrigin) {
      if(reqOrigin=="csp.sowl.cn"){
        return "47.52.151.165"
      }else if(reqOrigin=="csp.jfry.cn"){
        return "47.52.151.165"
      }else {
        return  "223.68.83.113"
      }
    }
    function kdxf(text,reqOrigin,cb){
      console.log(text,reqOrigin)
        /* 调科大讯飞的api */
        axios({
          method: 'post',
          url: 'https://api.xfyun.cn/v1/service/v1/tts',
          params: {
            text: text
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-Real-Ip': IP(reqOrigin),
            'X-Appid': '5b29b152',
            'X-CurTime': curTime(),
            'X-Param': paramsBase64(),
            'X-CheckSum': checkSum()
          },
          responseType: 'arraybuffer',
          }).then((res)=>{
          cb(res)
          });
    }
     router.get('/',function(req,res,next){
      const reqOrigin = req.headers.origin;
       const text=req.param('text') ;
       kdxf(text,reqOrigin,response=>{
        console.log(response.headers['content-type'])
        if (response.headers['content-type'] === 'audio/mpeg') {
          return res.send({
            data:response.data,
            errorMessage:null,
            errorCode:null,
            success:true,
          });
         }else{
          return res.send({
            data:null,
            errorMessage:"科大讯飞接口异常",
            errorCode:'001',
            success:false,
          });
          }
    })
})

module.exports = router;