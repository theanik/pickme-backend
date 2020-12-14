const router = require('express').Router();
const { check } = require('express-validator');
const {DriverLatLong,Driver} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')
const Validate = [
    check('driverId').exists(),
]

router.post('/api/v1/driver_lat_long_create',Validate,rejectInvalid,async(req,res)=>{
    console.log(req.body)
    let {driverId,lat,long,vehicleType,isApprove,isActive} = req.body
    let [reqErr,Created] = await _p(DriverLatLong.create({
        driverId,lat,long,vehicleType,isApprove,isActive
    }));

    if(!reqErr && Created){
        res.json({error:false,message:"Created"}).status(201)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})


const latLongValid = [
    check('lat').exists(),
    check('long').exists()
]

// router.put('/api/v1/driver_lat_long_up/:id',latLongValid,rejectInvalid,async(req,res)=>{
//     console.log(req.body)
//     let d_id = req.params.id;
//     let [reqError,DriverData] = await _p(DriverLatLong.findOne({
//         where:{
//             driverId : d_id
//         }
//     }))

//     if(!reqError && DriverData){
//         let {lat,long,vehicleType,isApprove,isActive} = req.body

//         let [reqErr,DriverLatLongUp] = await _p(DriverLatLong.update({
//             lat,long,vehicleType,isApprove,isActive
//         },{
//             where:{
//                 driverId : d_id
//             }
//         }))
//         if(!reqErr && DriverLatLongUp){
//             res.json({error:false,message:"driver lat long update"}).status(200)
//         }else{
//             res.json({error:true,message : reqErr.message}).status(400)
//         }
//     }else{
//         res.json({error:true,message:"Driver not found"}).status(400)
//     }
// })

router.put('/api/v1/driver_lat_long_up/:id',latLongValid,rejectInvalid,async(req,res)=>{
    console.log(req.body)
    let d_id = req.params.id;
    let [reqError,DriverData] = await _p(Driver.findOne({
        where:{
            id : d_id
        }
    }))

    if(!reqError && DriverData){
        let {lat,long,direction} = req.body

        let [reqErr,DriverLatLongUp] = await _p(Driver.update({
            lat,long,direction
        },{
            where:{
                id : d_id
            }
        }))
        if(!reqErr && DriverLatLongUp){
            res.json({error:false,message:"driver lat long update"}).status(200)
        }else{
            res.json({error:true,message : reqErr.message}).status(400)
        }
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
    }
})


router.put('/api/v1/driver_status_actice/:id',async(req,res)=>{
   // console.log(req.body)
    let d_id = req.params.id;
    let [reqError,DriverData] = await _p(DriverLatLong.findOne({
        where:{
            driverId : d_id
        }
    }))

    if(!reqError && DriverData){
        //let {lat,long,vehicleType,isApprove,isActive} = req.body

        let [reqErr,DriverLatLongUp] = await _p(DriverLatLong.update({
            isActive : true
        },{
            where:{
                driverId : d_id
            }
        }))
        if(!reqErr && DriverLatLongUp){
            res.json({error:false,message:"driver active"}).status(200)
        }else{
            res.json({error:true,message : reqErr.message}).status(400)
        }
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
    }
})


router.put('/api/v1/driver_status_deactice/:id',async(req,res)=>{
    // console.log(req.body)
     let d_id = req.params.id;
     let [reqError,DriverData] = await _p(DriverLatLong.findOne({
         where:{
             driverId : d_id
         }
     }))
 
     if(!reqError && DriverData){
         //let {lat,long,vehicleType,isApprove,isActive} = req.body
 
         let [reqErr,DriverLatLongUp] = await _p(DriverLatLong.update({
             isActive : false
         },{
             where:{
                 driverId : d_id
             }
         }))
         if(!reqErr && DriverLatLongUp){
             res.json({error:false,message:"driver deactice"}).status(200)
         }else{
             res.json({error:true,message : reqErr.message}).status(400)
         }
     }else{
         res.json({error:true,message:"Driver not found"}).status(400)
     }
 })

router.get('/api/v1/all_driver_lat_long', async(req,res)=>{
    let [Err,DLLD] = await _p(Driver.findAll())
    if(!Err && DLLD){
        res.json({error:false,DLLD}).status(200)
    }else{
        res.json({error:true,message:Err.message}).status(400)
    }
})

router.get('/api/v1/driver_lat_long/:id', async(req,res)=>{
    let d_id = req.params.id;
    let [reqError,DriverData] = await _p(Driver.findOne({
        where:{
            driverId : d_id
        }
    }))

    if(!reqError && DriverData){
        res.json({error:false,DriverData}).status(200)
    }else{
        res.json({error:true,message:"Driver Not found"}).status(400)
    }
})

module.exports = router