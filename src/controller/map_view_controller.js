const router = require('express').Router();
const {DriverLatLong} = require('../../models/index')
const _p = require('../utils/promise_error')

router.get('/api/v1/map_view', async (req,res)=>{
    let [reqErr,Data] = await _p(DriverLatLong.findAll({
        where :{
            isActive : true
        }
    }))

    if(!reqErr && Data){
        res.json(Data).status(200)
    }else{
        res.json({error:true,messsage:reqErr.messsage})
    }
})

module.exports = router