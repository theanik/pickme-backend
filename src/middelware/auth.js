const jwt = require('jsonwebtoken');
const {app_secret} = require('../../config/config.json')

module.exports = function(req,res,next){
    if(!req.header('auth-token')){
        return res.json({
            message : "not authonticated 1",
            error : true
        }).status(401)
    }

    let token = req.header('auth-token');

    jwt.verify(token,app_secret,(err,decodeAdminInfo)=>{
        if(err){
            console.log(err)
            return res.json({
                message : "not authenticate 2",
                error : true
            }).status(401)
        }else{
            res.admin_info = decodeAdminInfo;
            next()
        }
    })
}
