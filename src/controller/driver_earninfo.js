const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const {DriverEarnInfo} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')



router.put('/api/v1/driverinfo_up_ridecomplite/:id',async (req,res)=>{
    let d_id = req.params.id
    let [reqErr,DriverInfoData] = await _p(DriverEarnInfo.findOne({
        where :{
            driverId : d_id
        }
    }))

    if(!reqErr && DriverInfoData){
        let {fare,bonus} = req.body
        console.log(req.body)
        var newTotalRide = DriverInfoData.totalRide + 1;
        var newtotalEarn = DriverInfoData.totalEarn + fare + bonus;
        var newWallet = DriverInfoData.wallet + fare + bonus;
        var newbonus = DriverInfoData.bonus + bonus;
        console.log(newTotalRide)
        console.log(parseFloat(newtotalEarn))
        console.log(newWallet)
        console.log(newbonus)
        let [Err, Update] = await _p(DriverEarnInfo.update({
            totalRide : newTotalRide,
            totalEarn : parseFloat(newtotalEarn),
            wallet :parseFloat(newWallet),
            bonus : parseFloat(newbonus)

        },{
            where :{
                driverId : d_id
            }
        }))

        if(!Err && Update){
            res.json({error:false,message : "Update Success"})
        }else{
            res.json({error:true,message:Err.message})
        }
    }else{
        res.json({error:true,message : reqErr.message})
    }
})

router.put('/api/v1/driver_rating/:id', async(req,res)=>{
    let d_id = req.params.id
    let [reqErr,DriverInfoData] = await _p(DriverEarnInfo.findOne({
        where :{
            driverId : d_id
        }
    }))

    if(!reqErr && DriverInfoData){
        let {rating} = req.body
        var newRating = DriverInfoData.rating + rating
        var newUserCount = DriverInfoData.ratingUserCount + 1

        let [Err, Update] = await _p(DriverEarnInfo.update({
            rating : newRating,
            ratingUserCount : newUserCount

        },{
            where :{
                driverId : d_id
            }
        }))

        if(!Err && Update){
            res.json({error:false,message : "Update Success"}).status(200)
        }else{
            res.json({error:true,message:Err.message})
        }
        
    }else{
        res.json({error:true,message : "not found"})
    }
})


router.get('/api/v1/driver_tolat_earn/:id', async(req,res)=>{
    let driver_id = req.params.id
    let [Err,TotatEarn] = await _p(DriverEarnInfo.findOne({
        where : {
            driverId : driver_id
        }
    }))

    if(!Err && TotatEarn){
        res.json({error:false,TotatEarn}).status(200)
    }else{
        res.json({error:true,message : "something went wrong"})
    }
})


//get all driver balance or eran info
router.get('/api/v1/all_driver_eran_info',async(req,res)=>{
    let [reqErr , AllDriverEarnInfo] = await _p(DriverEarnInfo.findAll({}))
    if(!reqErr && AllDriverEarnInfo) {
        res.json({error:false,AllDriverEarnInfo})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})





module.exports = router