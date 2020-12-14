const router = require('express').Router();
const { check } = require('express-validator');
const {PromoCode} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')
const Validation = [
    check('promoCode').exists(),
    check('regionId').exists(),
    check('vehicleType').exists(),
    check('stratDate').exists(),
    check('endDate').exists(),
    check('offerAmount').exists()
]
router.post('/admin_api/v1/add_promocode',Validation,rejectInvalid,async(req,res,next)=>{

    let {promoCode,regionId,vehicleType,stratDate,endDate,offerAmount} = req.body 

    let [reqErr,promoCodeCreate] = await _p(PromoCode.create({
        promoCode,regionId,vehicleType,stratDate,endDate,offerAmount,status:0
    }));

    if(!reqErr && promoCodeCreate){
        res.json({error:false,message:"promoCodeCreate Created"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.get('/admin_api/v1/promocode/:id',async(req,res,next)=>{
    let p_id = req.params.id;

    let [error,promoData] = await _p(PromoCode.findOne({
        where : {
            id : p_id
        }
    }))

    if(!error && promoData){
        res.json(promoData).status(200)
    }else{
        res.json({error:true,message:"promo code not found"}).status(200)
    }
})

router.put('/admin_api/v1/promocode/:id',Validation,rejectInvalid,async(req,res,next)=>{
    let p_id = req.params.id;

    let [error,promoData] = await _p(PromoCode.findOne({
        where : {
            id : p_id
        }
    }))

    if(!error && promoData){
        let {promoCode,regionId,vehicleType,stratDate,endDate,offerAmount} = req.body 

        let [reqErr,promoCodeUpdate] = await _p(PromoCode.update({
            promoCode,regionId,vehicleType,stratDate,endDate,offerAmount,status:promoData.status
        },{
            where :{
                id : p_id
            }
        }));

        if(!reqErr && promoCodeUpdate){
            res.json({error:false,message:"promoCodeCreate updated"}).status(200)
        }else{
            res.status(400).json({error:true,message:reqErr.message});
        }
    }else{
        res.json({error:false,message:"promoCode not found"}).status(400)
    }



    
})
router.delete('/admin_api/v1/promocode/:id',async(req,res,next)=>{

    let p_id = req.params.id;

    let [reqErr,promoDataDelete] = await _p(PromoCode.destroy({
        where : {
            id : p_id
        }
    }))

    if(!reqErr && promoDataDelete){
        res.json({error:false,message:"promoCode Delete"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.get('/admin_api/v1/promocode_all',async(req,res,next)=>{

    let [error,promoData] = await _p(PromoCode.findAll())

    if(!error && promoData){
        res.json(promoData).status(200)
    }else{
        res.json({error:true,message:"promo code not found"}).status(200)
    }
})

router.put('/admin_api/v1/promocode_actice/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,Active] = await _p(PromoCode.update({
        status:1
    },{
        where :{
            id : r_id
        }
    }));

    if(!reqErr && Active){
        res.json({error:false,message:"promoCode  Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

router.put('/admin_api/v1/promocode_deactice/:id',async(req,res,next)=>{
    let r_id = req.params.id;

    let [reqErr,Active] = await _p(PromoCode.update({
        status:0
    },{
        where :{
            id : r_id
        }
    }));
if(!reqErr && Active){
        res.json({error:false,message:"promoCode  Active"}).status(200)
    }else{
        res.status(400).json({error:true,message:reqErr.message});
    }
})

module.exports = router