const router = require('express').Router();
const {PaymentLog} = require('../../models/index')
const _p = require('../utils/promise_error')
var FCM = require('fcm-node');

router.post('/api/v1/payment',async(req,res)=>{
    let {rideId,
        driverId,
        driverName,
        driverPhone,
        carType,
        userId,
        userName,
        userPhone,
        payAmount,
        status,
        transactionId
        
    } = req.body


    let [reqErr, PaymentDone] = await _p(PaymentLog.create({
        rideId,
        driverId : driverId,
        driverName,
        driverPhone,
        carType,
        userId,
        userName,
        userPhone,
        payAmount,
        status,
        transactionId
    }))

    if(!reqErr && PaymentDone) {

        var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
        var fcm = new FCM(serverKey);
        var token = req.body.driverDeviceId
        var title = 'Payment Done'
        var body = 'Paymnet Complite. Pay Amount '+payAmount
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

        //res.json({error:false,message : })
    }else{
        res.json({error:true,message : reqErr.message})
    }




})


//get all paymnet log for admin

router.get('/api/v1/all_paymentlog',async(req,res)=>{
    let [reqErr,PaymentLogData] = await _p(PaymentLog.findAll())

    if(!reqErr && PaymentLogData) {
        res.json({error:false,PaymentLogData})
    }else{
        res.json({error:true,message:reqErr.message})
    }
})


module.exports = router