const router = require('express').Router();

const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')

const bodyParser = require('body-parser');

var FCM = require('fcm-node');
//var FCM = require('fcm-push');

router.post('/api/v1/pushmessage', async (req, res)=> {
    console.log(req.body)
    var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
    var fcm = new FCM(serverKey);
    var {title,body,token} = req.body
    console.log("Token Value  :   " + token);
    var message = {
        to: token,
        collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
        // click_action:'FLUTTER_NOTIFICATION_CLICK',
        notification: {title, body, "click_action":"FLUTTER_NOTIFICATION_CLICK",},
        data: {my_key: 'my value', contents: "abcv/",
        title ,
        body,
        "click_action":"FLUTTER_NOTIFICATION_CLICK"}
    };
    fcm.send(message, await function _p(err, response) {
        if (err) {
            res.json({status: 0, message: err});
            console.log("error : "+err);
        } else {
            console.log("MESSAGE SEND");
            res.json({status: 1, message: response});
        }
    })
});

  
module.exports = router;