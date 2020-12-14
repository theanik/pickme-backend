const router                              = require('express').Router();
const {Driver,FareCalculate,User,RideLog, RideCompliteLog,PromoCode} = require('../../models/index')
const _p                                  = require('../utils/promise_error')
const Sequelize                           = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/rajdut_cab";
const sequelize = new Sequelize(CONNECTION_STRING);

var FCM = require('fcm-node');
const bodyParser = require('body-parser');

router.get('/api/v1/nearest_driver/:carType/:lat/:long', async(req,res)=>{
  // let {carType,lat,long} = req.body
  let carType = req.params.carType
  let lat = req.params.lat
  let long = req.params.long
  // var carType = res.params.carType
  // var lat = res.params.lat
  // var long = res.params.long
  console.log(carType)
  console.log(lat)
  console.log(long)
 // let [rE,AllDriver] = await _p(Driver.findAll())

  // let distance = function(driverLat,driverLong){
  //   return 3956 * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(current_lat - driverLat) * Math.PI/180/2),2)+Math.cos(current_lat * Math.PI/180)*Math.pow(Math.sin((current_long - driverLong)*Math.PI/180/2),2))
  // }
 
  // var location = sequelize.literal(`ST_GeomFromText('POINT(${lat} ${long})')`);
  // var distance = sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(ST_X(location))) * cos(radians("+long+") - radians(ST_Y(location))) + sin(radians("+lat+")) * sin(radians(ST_X(location))))");
  // var attributes = Object.keys(Driver.attributes);
  // attributes.push([distance,'distance']);
  var [err,data] = await _p(Driver.findAll({
  
    attributes: [[sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("lat-"+lat)),2),'calculate_lat'],
               [sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("long-"+long)),2),'calculate_long'],'id','firstName','lastName','deviceId','lat','long'], 
    // attributes : [sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(lat)) * cos(radians("+long+") - radians(long)) + sin(radians("+lat+")) * sin(radians(lat)))"),'Driver'],
     //order: sequelize.col('long'),
      order: [sequelize.fn('SQRT', sequelize.literal('lat+long'))],
      where :{
        isApprove : 1,
        status : 1,
        vehicleType : carType
      },
      // attributes : attributes,
      // order: distance,

       limit: 10
  }))

//   const location = sequelize.literal(`ST_GeomFromText('POINT(${ long } ${  lat })')`)
// const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('lat'), location)

// var [err,data] = await Driver.findAll({
//     //order: distance,
//     // where: sequelize.where(distance, { $lte: radius }),
//     attributes: [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(lat)) * cos(radians("+long+") - radians(lat)) + sin(radians("+lat+")) * sin(radians(lat)))"),'Driver']],
//     order: sequelize.col('lat'),
//     limit: 10
// })

  // var query = {
  //   attributes: attributes,
  //   order: distance,
  //   include: {model: Driver, as: 'driver'},
  //   where: sequelize.where(distance, 100),
  //   logging: console.log
  // }
  // if(!rE,AllDriver){
  //   res.json(AllDriver)
  // }else{
  //   res.json({m:'no data',message:rE.message})
  // }
  //console.log(AllDriver)

  if(data && !err){
    res.json(data)
  }else{
    
  res.json({error:true,message:err.message})
  }

  // var query = sequelize.query("SELECT Drivers.id, 6371 * acos (cos ( radians("+lat+") )* cos( radians( Drivers.lat ) )* cos( radians( Drivers.long ) - radians("+long+") )+ sin ( radians("+lat+") )* sin( radians( Drivers.lat ) )) as distance FROM Drivers HAVING distance < 30 ORDER BY distance;",
  // { type: sequelize.QueryTypes.SELECT , raw: true})
  // 
  
  // if(query){
  //   res.json(query)
  // }else{
  //   res.send('f')
  // }
})

router.get('/api/v1/ride_fare/:carType/:km/:time',async(req,res)=>{
  // let {carType,kilometer,time} = req.body
  let carType   = req.params.carType
  let kilometer = req.params.km
  let time      = req.params.time

  let [reqErr,fareData] = await _p(FareCalculate.findOne({
    where :{
      carType : carType
    }
  }))

  if(!reqErr && fareData){
  

    
    var total = fareData.baseFare + (fareData.kmRate * kilometer) + (fareData.minRate * time) + fareData.insurance;
    
    if(total >= fareData.minFare){
      total = total
    }else{
      total = fareData.minFare
    }
    total = Math.round(total)
    res.json(total).status(200)
  }else{
    res.json({error:true,message:"something went wrong"})
  }
})

// lat,long,userDeviceId,

// router.post('/api/v1/ride_request1', async(req,res)=>{
//   let {lat,long,userDeviceId,carType,destinationPlace,total} = req.body
//   var [err,nearestDriver] = await _p(Driver.findOne({
  
//     attributes: [[sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("lat-"+lat)),2),'lat'],
//                [sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("long-"+long)),2),'long'],'id','firstName','deviceId'], 
//     // attributes : [sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(lat)) * cos(radians("+long+") - radians(long)) + sin(radians("+lat+")) * sin(radians(lat)))"),'Driver'],
//      //order: sequelize.col('long'),
//       order: [sequelize.fn('SQRT', sequelize.literal('lat+long'))],
//       where :{
//         isApprove : 1,
//         status : 1,
//         vehicleType : carType
//       }
//   }))

//   let [reqErr,UserData] = await _p(User.findOne({
//     where : {
//       deviceId : userDeviceId
//     }
//   }))

//   // if(!err && nearestDriver){
//     var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
//     var fcm = new FCM(serverKey);
//     var token = "dvSAQXRzKdo:APA91bGfUZCLQ31r57F3kSVOKR-T_8NwzSDNZ5KHf8CSUVfOM19-DtEQYIGSBjvgYBsA3KQpJMN-QtElA2KERrf7gS3AgxqRnmwaQW5SshQIZkwKZ9jc41ou_cB1wATRc2WeuhGlQnY_"
//     var title = 'New Ride Request'
//     // var body = `You have new ride Request from  ${UserData.firstName}. 
//     //             Phone : ${UserData.phone}
//     //             Destination : ${destinationPlace} 
//     //             Fare : ${total}`
//     var body = 'you have new ride req'
//     console.log("Token Value  :   " + token);
//     var message = {
//       to: token,
//       collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
//       // click_action:'FLUTTER_NOTIFICATION_CLICK',
//       notification: {title, body, "click_action":"FLUTTER_NOTIFICATION_CLICK",},
//       data: {my_key: 'my value', contents: "abcv/",
//       title ,
//       body,
//       "click_action":"FLUTTER_NOTIFICATION_CLICK"}
//   };
//     fcm.send(message, await function _p(err, response) {
//         if (err) {
//             res.json({status: 0, message: err});
//             console.log("error : "+err);
//         } else {
//             console.log("MESSAGE SEND");
//             res.json({status: 1, message: response});
//         }
//     })
//   // }

// });

router.post('/api/v1/ride_request', async (req, res)=> {

  let {lat,long,userDeviceId,carType,destinationPlace,from,km,total,toLat,toLong} = req.body
  var [err,nearestDriver] = await _p(Driver.findOne({
  
    attributes: [[sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("lat-"+lat)),2),'calculate_lat'],
               [sequelize.fn('POW',sequelize.fn('ABS',sequelize.literal("long-"+long)),2),'calculate_long'],'id','firstName','lastName','deviceId','lat','long'], 
    // attributes : [sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(lat)) * cos(radians("+long+") - radians(long)) + sin(radians("+lat+")) * sin(radians(lat)))"),'Driver'],
     //order: sequelize.col('long'),
      order: [sequelize.fn('SQRT', sequelize.literal('lat+long'))],
      where :{
        isApprove : 1,
        status : 1,
        vehicleType : carType
      }
  }))

  let [reqErr,UserData] = await _p(User.findOne({
    where : {
      deviceId : userDeviceId
    }
  }))
  var promoCode = req.body.promoCode
console.log(promoCode)
  if(promoCode){
    let [reqErr,PromoCodeData] = await _p(PromoCode.findOne({
      where : {
        promoCode : req.body.promoCode
      }
    }))
// console.log(total)


    if(PromoCodeData){
      console.log(PromoCodeData)
      if(carType === PromoCodeData.vehicleType){
        if(PromoCodeData.endDate <= new Date()){
          total = total - PromoCodeData.offerAmount
        }else{
          res.json({message : "Invalide Promocode time"})
             console.log('nullllllllllllllllll')
             return
        }
        
      }
     // console.log(total)
    }else{
      res.json({message : "Invalide Promocode"})
      console.log('nullllllllllllllllll')
      return
    }
  }

  if(!err && nearestDriver){
  var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
  var fcm = new FCM(serverKey);
  //var token = "dvSAQXRzKdo:APA91bGfUZCLQ31r57F3kSVOKR-T_8NwzSDNZ5KHf8CSUVfOM19-DtEQYIGSBjvgYBsA3KQpJMN-QtElA2KERrf7gS3AgxqRnmwaQW5SshQIZkwKZ9jc41ou_cB1wATRc2WeuhGlQnY_"
  var token = nearestDriver.deviceId
  var title = 'New Ride Request'
  // var body = `You have new ride Request from  ${UserData.firstName}. 
  //               Phone : ${UserData.phone}
  //               Destination : ${destinationPlace} 
  //               Fare : ${total}`
  let type = 'RIDE_REQUEST'
  var body = 'Ride abalavle from ' +UserData.firstName +'\nDestination : '+destinationPlace+'\nFare : '+total+ '\nThank you.'
  console.log("Token Value  :   " + token);
  var details = {
    userFirstName : UserData.firstName,
    userLastName : UserData.lastName,
    userPhone : UserData.phone,
    distance : km,
    from : from,
    to : destinationPlace,
    fromLat : lat,
    fromLong :long,
    toLat : toLat,
    toLong : toLong,
    fare : total,
    profile : UserData.image,
    userDeviceId : UserData.deviceId,
    userId : UserData.id,
    type: 'RIDE_REQUEST',
    promoCode : promoCode
  }
  console.log(typeof(details))
  var message = {
      to: token,
      collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
      // click_action:'FLUTTER_NOTIFICATION_CLICK',
      notification: {title, body, details,"click_action":"FLUTTER_NOTIFICATION_CLICK"},
      data: {type: 'RIDE_REQUEST', contents: "abcv/",
      title ,
      body,
      "details": details,
      "click_action":"FLUTTER_NOTIFICATION_CLICK"}
  };
  fcm.send(message, await function (err, response) {
      if (err) {
          res.json({status: 0, message: err});
          console.log("error : "+err);
      } else {
          console.log("MESSAGE SEND");
          res.json({status: 1, message: response, details});
      }
  })
}else{
  res.json({message:"nouthing"})
}
});

router.post('/api/v1/driver_accept_ride', async(req,res)=>{
  console.log(req.body)
  let {driverDeviceId,userDeviceId,startPoint,destinationPlace,fare,carType} = req.body

  let [reqErr,UserData] = await _p(User.findOne({
    where : {
      deviceId : userDeviceId
    }
  }))

  let [reqEr,DriverData] = await _p(Driver.findOne({
    where : {
      deviceId : driverDeviceId
    }
  }))
  
  var driverDetails = {
   driverFirstName : DriverData.firstName,
  driverLastName : DriverData.lastName,
  driverPhone : DriverData.phone,
  driverImage : DriverData.image,
  vehicleRegNo : DriverData.vehicleReg,
  vehicleName : DriverData.vehicleName

}
console.log(DriverData)
let [Err,RideData] = await _p(RideLog.create({
    driverId: DriverData.id,
    driverName: DriverData.firstName,
    userId: UserData.id,
    userName: UserData.firstName,
    carType,
    startPoint,
    fare :fare,
    destinationPoint: destinationPlace,
    rideStatus : "RUNNING"
}))

var driverDetails = {
  driverFirstName : DriverData.firstName,
  driverLastName : DriverData.lastName,
  driverPhone : DriverData.phone,
  driverImage : DriverData.image,
  vehicleRegNo : DriverData.vehicleReg,
  vehicleName : DriverData.vehicleName,
  id : DriverData.id,
  driverDeviceId : DriverData.deviceId

}

if(!Err &&  RideData){

  var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
    var fcm = new FCM(serverKey);
    var token = UserData.deviceId
    var title = `Hayy Your Ride is confirmed`
    var body = 'You will ride with ' +DriverData.firstName +'\nDestination : '+destinationPlace+'\nFare : '+fare+ '\nThank you.'
    console.log("Token Value  :   " + token);
    var message = {
        to: token,
        collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
        // click_action:'FLUTTER_NOTIFICATION_CLICK',
        notification: {title, body, "click_action":"FLUTTER_NOTIFICATION_CLICK",},
        data: {my_key: 'my value', contents: "abcv/",
        title ,
        body,
         "driverDetails" : driverDetails,
         "rideLogId" : RideData.id,
        "click_action":"FLUTTER_NOTIFICATION_CLICK",
        "type": 'RIDE_REQUEST'
      }
    };
    fcm.send(message, await function _p(err, response) {
        if (err) {
            res.json({status: 0, message: err});
            console.log("error : "+err);
        } else {
            console.log("MESSAGE SEND");
            res.json({status: 1, message: response,userDeviceId,UserData,DriverData,rideLogId : RideData.id});
        }
    })

 // res.json({error:false,message:"Ride loged"})
}else{
  res.json({error:true,message:Err.message})
}


})



///complite ride
router.post('/api/v1/ride_complite',async(req,res)=>{
  let {driverId,driverFirstName,driverLastName,driverPhone,userId,userFirstName,userLastName,userPhone,carType,
    fare,fromLat,fromLong, toLat, toLong,startPoint,destinationPoint,promoCode,userDeviceId,driverDeviceId,
    driverImage,userImage,rideLogId,distance} = req.body

    let [reqErr,Created] = await _p(RideCompliteLog.create({
      driverId,driverFirstName,driverLastName,driverPhone,userId,userFirstName,userLastName,userPhone,carType,fare,
       fromLat,fromLong, toLat, toLong,startPoint,destinationPoint,promoCode,distance,driverImage,userImage
    }))

    if(!reqErr && Created){

      let [err,RideLogUpdate] = await _p(RideLog.update({
        rideStatus : "COMPLITE"
      },{
        where : {
          id : rideLogId
        }
      }))

      if(!err && RideLogUpdate){
          var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
          var fcm = new FCM(serverKey);
          var token = userDeviceId
          var title = `Hayy Your Ride is Conmplite`
          var body = 'Thank you for staying with us'
          console.log("Token Value  :   " + token);
          var message = {
              to: token,
              collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
              // click_action:'FLUTTER_NOTIFICATION_CLICK',
              notification: {title, body, "click_action":"FLUTTER_NOTIFICATION_CLICK",},
              data: {my_key: 'my value', contents: "abcv/",
              title ,
              body, 
              "type" : "RIDE_COMPLETE",
              "rideCompleteLogId" : Created.id,
              "click_action":"FLUTTER_NOTIFICATION_CLICK",}
          };
          fcm.send(message, await function _p(err, response) {
              if (err) {
                  res.json({status: 0, message: err});
                  console.log("error : "+err);
              } else {
                  console.log("MESSAGE SEND");
                  res.json({status: 1, message: response,customMessage : "ride complite"});
              }
          })

      }else{
        res.json({error:true,message : err.message})
      }

      

    }else{
      res.json({err:true,message:reqErr.message})
    }
})

//Ride cancel

router.put('/api/v1/ride_cancel/:rideLogId', async (req,res)=>{
  let rideLogId = req.params.rideLogId
  let [err,Canceld] = await _p(RideLog.update({
    rideStatus : "CANCELD"
  },{
    where : {
      rideLogId
    }
  }))

  if(!err && Canceld){
    res.json({
      error : false, message : "cenceld"
    })
  }else{
    res.json({
      error : true , message : err.message
    })
  }
}) 

//get ride log
router.get('/admin_api/v1/all_ride_request_log',async(req,res)=>{
  let [reqErr , AllRideReqLog] = await _p(RideLog.findAll({}))
    if(!reqErr && AllRideReqLog) {
        res.json({error:false,AllRideReqLog})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


router.get('/admin_api/v1/all_ride_complite_log',async(req,res)=>{
  let [reqErr , AllRideCompliteLog] = await _p(RideCompliteLog.findAll({}))
    if(!reqErr && AllRideCompliteLog) {
        res.json({error:false,AllRideCompliteLog})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


router.get('/api/v1/user_ride_history/:id', async (req,res)=>{
  let id = req.params.id
  let [reqErr,UserHistoryData] = await _p(RideCompliteLog.findAll({
    where : {
      userId : id
    }
  }))

  if(!reqErr && UserHistoryData){
    res.json({error:false,UserHistoryData}).status(200)
  }else{
    res.json({error:true,message : reqErr.message}).status(400)
  }
})

router.get('/api/v1/driver_ride_history/:id', async (req,res)=>{
  let id = req.params.id
  let [reqErr,DriverHistoryData] = await _p(RideCompliteLog.findAll({
    where : {
      driverId : id
    }
  }))

  if(!reqErr && DriverHistoryData){
    res.json({error:false,DriverHistoryData}).status(200)
  }else{
    res.json({error:true,message : reqErr.message}).status(400)
  }
})

router.get('/api/v1/fare_details_show/:carType', async(req,res)=>{
  let carType   = req.params.carType

  let [reqErr,fareData] = await _p(FareCalculate.findOne({
    where :{
      carType : carType
    }
  }))

  if(!reqErr && fareData){
    res.json(fareData).status(200)
  }else{
    res.json({error:true,message:reqErr.message})
  }
})


router.get('/api/v1/total_complite_ride', async(req,res)=>{
  RideCompliteLog.count().then(c => {
    res.json(c).status(200)
  })
})

module.exports = router