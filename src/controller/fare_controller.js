const router = require('express').Router();
const { check } = require('express-validator')
const {FareCalculate} = require('../../models/index')
const rejectInvalid = require('../middelware/reject_invalid')
const _p = require('../utils/promise_error')

const validation = [
    check('carType').exists(),
    check('kmRate').exists(),
    check('minRate').exists(),
    check('baseFare').exists(),
    check('minFare').exists(),
    check('insurance').exists()
]

router.post('/admin_api/v1/add_fare',validation,rejectInvalid,async(req,res,next)=>{

    let {carType,kmRate,minRate,baseFare,minFare,insurance} = req.body 

    let [reqErr,regionCreated] = await _p(FareCalculate.create({
        carType,kmRate,minRate,baseFare,minFare,insurance
    }));

    if(!reqErr && regionCreated){
        res.json({error:false,message:"Fare Created"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.get('/admin_api/v1/fare/:id',async(req,res,next)=>{
    let r_id = req.params.id;
    let [reqErr,fareData] = await _p(FareCalculate.findOne({
        where :{
            id : r_id
        }
    }))

    if(!reqErr && fareData){
        res.json({error:false,fareData}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})

router.put('/admin_api/v1/fare/:id',validation,rejectInvalid,async(req,res,next)=>{
    let r_id = req.params.id;
   // console.log(r_id)
    let [reqErr1,fareData] = await _p(FareCalculate.findOne({
        where :{
            id : r_id
        }
    }))
    //console.log(regionData)
    if(!reqErr1 && fareData){
        let {carType,kmRate,minRate,baseFare,minFare,insurance} = req.body  

        let [reqErr,fareUpdate] = await _p(FareCalculate.update({
            carType,kmRate,minRate,baseFare,minFare,insurance
        },{
            where : {
                id : r_id
            }
        }));

        if(!reqErr && fareUpdate){
            res.json({error:false,message:"Fare Updated"}).status(200)
        }else{
            res.status(400).json({error:true,message:reqErr.message});
        }
    }else{
        res.status(400).json({error:true,message:"region not found"});
    }

})



router.get('/admin_api/v1/all_fare/',async(req,res,next)=>{
    let [reqErr,fareData] = await _p(FareCalculate.findAll())

    if(!reqErr && fareData){
        res.json({error:false,fareData}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }

})


router.delete('/admin_api/v1/delete_fare/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,fareDeleted] = await _p(FareCalculate.destroy({
        where :{
            id : r_id
        }
    }));

    if(!reqErr && fareDeleted){
        res.json({error:false,message:"Region Type Deleted"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})


// router.get('/api/v1/get_fare/:type',)
module.exports = router