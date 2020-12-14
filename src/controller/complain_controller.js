const router = require('express').Router();
const {Complain,ComplainType,complainToUser,User,Driver} = require('../../models/index')
const _p = require('../utils/promise_error')

//admin create complain type
router.post('/admin_api/v1/create_complain_type', async (req,res)=>{
    let {complainType} = req.body

    let [reqErr , ComplainCreated] = await _p(ComplainType.create({
        complainType
    }))
    if(!reqErr && ComplainCreated) {
        res.json({error:false,message : "complain type Created"})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})

router.delete('/admin_api/v1/delete_complain/:id', async(req,res)=>{
    let complain_id = req.params.id
    let [reqErr , complainDeleted] = await _p(ComplainType.destroy({
        where : {
            id : complain_id
        }
    }))
    if(!reqErr && complainDeleted) {
        res.json({error:false,message : "complain type deleted"})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})

router.get('/api/v1/all_complain', async (req,res)=>{
    let [reqErr , AllComplain] = await _p(ComplainType.findAll({}))
    if(!reqErr && AllComplain) {
        res.json({error:false,AllComplain})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


///user complain

router.post('/api/v1/create_complain', async (req,res)=>{
    let {userId,driverId,complain,complainType} = req.body
    
        let [reqErr , ComplainCreated] = await _p(Complain.create({
            userId,driverId,complain,complainType
        }))
        if(!reqErr && ComplainCreated) {
            res.json({error:false,message : "complain Created"})
        }else{
            res.json({error:true,message : reqErr.message})
        }
    
})


router.get('/api/v1/all_user_complain', async (req,res)=>{
    let [reqErr , AllUserComplain] = await _p(Complain.findAll({
        include : [User,Driver]
    }))
    if(!reqErr && AllUserComplain) {
        res.json({error:false,AllUserComplain})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


///driver complain

router.post('/api/v1/create_complain_to_user', async (req,res)=>{
    let {userId,driverId,complain,complainType} = req.body
    
        let [reqErr , ComplainCreated] = await _p(complainToUser.create({
            userId,driverId,complain,complainType
        }))
        if(!reqErr && ComplainCreated) {
            res.json({error:false,message : "complain  to user"})
        }else{
            res.json({error:true,message : reqErr.message})
        }
    
})



router.get('/api/v1/all_driver_complain_to_user', async (req,res)=>{
    let [reqErr , AllDriverComplain] = await _p(complainToUser.findAll({}))
    if(!reqErr && AllDriverComplain) {
        res.json({error:false,AllDriverComplain})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


module.exports = router