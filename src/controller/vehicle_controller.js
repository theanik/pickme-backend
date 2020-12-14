const router = require('express').Router();
const { check, validationResult } = require('express-validator')
const {Vehicle} = require('../../models/index')
const rejectInvalid = require('../middelware/reject_invalid')
const _p = require('../utils/promise_error')

let VehicleValidation = [
    check('vehicleType').exists(),
    check('maxSit').exists(),
]

router.post('/admin_api/v1/add_vehicle_type',VehicleValidation,rejectInvalid,async(req,res,next)=>{

    let {vehicleType,maxSit} = req.body 

    let [reqErr,vehicleTypeCreateded] = await _p(Vehicle.create({
        vehicleType,maxSit,status:0
    }));

    if(!reqErr && vehicleTypeCreateded){
        res.json({error:false,message:"Vehicle Type Created"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.put('/admin_api/v1/vehicle_actice/:id',async(req,res,next)=>{
    let v_id = req.params.id;

    let [reqErr,vehicleActive] = await _p(Vehicle.update({
        status:1
    },{
        where :{
            id : v_id
        }
    }));

    if(!reqErr && vehicleActive){
        res.json({error:false,message:"Vehicle Type Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.put('/admin_api/v1/vehicle_deactice/:id',async(req,res,next)=>{
    let v_id = req.params.id;

    let [reqErr,vehicleDeActive] = await _p(Vehicle.update({
        status:0
    },{
        where :{
            id : v_id
        }
    }));

    if(!reqErr && vehicleDeActive){
        res.json({error:false,message:"Vehicle Type De Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.delete('/admin_api/v1/delete_vehicle/:id',async(req,res,next)=>{
    let v_id = req.params.id;

    let [reqErr,vehicleDeteted] = await _p(Vehicle.destroy({
        where :{
            id : v_id
        }
    }));

    if(!reqErr && vehicleDeteted){
        res.json({error:false,message:"Vehicle Type Deleted"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.get('/admin_api/v1/get_all_vehicle_type',async(req,res)=>{
    let[reqErr ,AllVehicleData] = await _p(Vehicle.findAll())
    if(!reqErr && AllVehicleData){
        res.json({error:false,AllVehicleData}).status(200)
    }else{
        res.json({error:true,message:"something wend wrong"});
    }
})

router.get('/api/v1/get_all_vehicle_type',async(req,res)=>{
    let[reqErr ,AllVehicleData] = await _p(Vehicle.findAll())
    if(!reqErr && AllVehicleData){
        res.json({error:false,AllVehicleData}).status(200)
    }else{
        res.json({error:true,message:"something wend wrong"});
    }
})

module.exports = router