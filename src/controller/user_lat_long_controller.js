const router = require('express').Router();
const { check } = require('express-validator');
const {UserLatLong} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')
const Validate = [
    check('userId').exists(),
]

router.post('/api/v1/user_lat_long_create',Validate,rejectInvalid,async(req,res)=>{
    let {userId,lat,long,isApprove,isActive} = req.body
    let [reqErr,Created] = await _p(UserLatLong.create({
        userId,lat,long,isApprove,isActive
    }));

    if(!reqErr && Created){
        res.json({error:false,message:"Created"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})

const latLongValid = [
    check('lat').exists(),
    check('long').exists()
]
router.put('/api/v1/user_lat_long_up/:id',latLongValid,rejectInvalid,async(req,res)=>{
    let u_id = req.params.id;
    let [reqError,userData] = await _p(UserLatLong.findOne({
        where:{
            userId : u_id
        }
    }))

    if(!reqError && userData){
        let {lat,long} = req.body

        let [reqErr,userLatLongUp] = await _p(UserLatLong.update({
            lat,long
        },{
            where:{
                id : u_id
            }
        }))
        if(!reqErr && userLatLongUp){
            res.json({error:false,message:"user lat long update"}).status(200)
        }else{
            res.json({error:true,message : reqErr.message}).status(400)
        }
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
})


router.get('/api/v1/user_lat_long/:id', async(req,res)=>{
    let u_id = req.params.id;
    let [reqError,UserDara] = await _p(UserLatLong.findOne({
        where:{
            userId : u_id
        }
    }))
    if(!reqError && UserDara){
        res.json({error:false,UserDara}).status(200)
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
})

module.exports = router
