const router = require('express').Router();
const { check } = require('express-validator')
const {Region} = require('../../models/index')
const rejectInvalid = require('../middelware/reject_invalid')
const _p = require('../utils/promise_error')

const validation = [
    check('regionName').exists(),
    check('carType').exists(),
    check('basePrice').exists(),
    check('kilometerRat').exists(),
    check('minuteRate').exists(),
    check('location').exists(),
    check('range').exists()
]

router.post('/admin_api/v1/add_region',validation,rejectInvalid,async(req,res,next)=>{

    let {regionName,carType,basePrice,kilometerRat,minuteRate,range,location} = req.body 

    let [reqErr,regionCreated] = await _p(Region.create({
        regionName,carType,basePrice,kilometerRat,minuteRate,range,location,status:0
    }));

    if(!reqErr && regionCreated){
        res.json({error:false,message:"Region Created"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.get('/admin_api/v1/region/:id',async(req,res,next)=>{
    let r_id = req.params.id;
    let [reqErr,regionData] = await _p(Region.findOne({
        where :{
            id : r_id
        }
    }))

    if(!reqErr && regionData){
        res.json({error:false,regionData}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})

router.put('/admin_api/v1/region/:id',validation,rejectInvalid,async(req,res,next)=>{
    let r_id = req.params.id;
   // console.log(r_id)
    let [reqErr1,regionData] = await _p(Region.findOne({
        where :{
            id : r_id
        }
    }))
    //console.log(regionData)
    if(!reqErr1 && regionData){
        let {regionName,carType,basePrice,kilometerRat,minuteRate,range,location} = req.body 

        let [reqErr,regionUpdated] = await _p(Region.update({
            regionName,carType,basePrice,kilometerRat,minuteRate,range,location,status:regionData.status
        },{
            where : {
                id : r_id
            }
        }));

        if(!reqErr && regionUpdated){
            res.json({error:false,message:"Region Updated"}).status(200)
        }else{
            res.status(400).json({error:true,message:reqErr.message});
        }
    }else{
        res.status(400).json({error:true,message:"region not found"});
    }

})



router.get('/admin_api/v1/all_region/',async(req,res,next)=>{
    let [reqErr,regionData] = await _p(Region.findAll())

    if(!reqErr && regionData){
        res.json({error:false,regionData}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})

router.put('/admin_api/v1/region_actice/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,vehicleActive] = await _p(Region.update({
        status:1
    },{
        where :{
            id : r_id
        }
    }));

    if(!reqErr && vehicleActive){
        res.json({error:false,message:"region  Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.put('/admin_api/v1/region_deactice/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,regionDeActive] = await _p(Region.update({
        status:0
    },{
        where :{
            id : r_id
        }
    }));

    if(!reqErr && regionDeActive){
        res.json({error:false,message:"region  De Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.delete('/admin_api/v1/delete_region/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,RegionDeteted] = await _p(Region.destroy({
        where :{
            id : r_id
        }
    }));

    if(!reqErr && RegionDeteted){
        res.json({error:false,message:"Region Type Deleted"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

module.exports = router