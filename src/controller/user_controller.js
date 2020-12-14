const router = require('express').Router();
const { check } = require('express-validator');
const {User,Refer,UserWallet,UserWalletRecharge,UserRating} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// const path = require('path');
//check input validation
const UserRegisterValidate = [
    check('firstName').exists(),
    check('lastName').exists(),
    check('phone').exists().isLength({min:13,max:13}).withMessage("Invalide Phone number"),
    check('email').isEmail().optional({nullable: true}),
    check('gander').exists(),
    check('deviceId').exists()
]
const UserUpadateValidate = [
    check('firstName').exists(),
    check('lastName').exists(),
    check('phone').exists().isLength({min:13,max:13}),
    check('email').isEmail().optional({nullable: true}),
    check('gander').exists(),
]

// const unique_email = 

router.post('/api/v1/register_user',UserRegisterValidate,rejectInvalid,async(req,res)=>{
    console.log(req.body)
    let [emailErr ,PassEmail] = await _p(User.findOne({
        where :{
            email : req.body.email
        }
    }))
    let [phoneErr ,PassPhone] = await _p(User.findOne({
        where :{
            phone : req.body.phone
        }
    }))

    
    if(PassEmail && !emailErr){
        res.json({error:true,message:"Email already has been taken!!"})
    }else{
        if(PassPhone && !phoneErr){
            res.json({error:true,message:"phone has been taken!!"})
        }else{
            let refId = req.body.firstName.trim() + Math.floor(Math.random() * 10000);
            let {firstName,lastName,phone,email,gander,dob,image,deviceId} = req.body
    
            let [reqError,userCreated] = await _p(User.create({
                firstName,lastName,phone,email,gander,dob,image,deviceId,referId:refId,status : 0
            }))
    
            if(!reqError && userCreated){
                let [walletErr,WalletCreate] = await _p(UserWallet.create({

                    userId: userCreated.id,
                    wallet: 0,
                    joiningBonus: 0,
                    promobalance: 0
                }))
               
                if(!walletErr && WalletCreate){

                    let [ratingErr, ratingCreated] = await _p(UserRating.create({
                        userId : userCreated.id,
                        rating : 0,
                        coutRatingDriver: 0

                    }))
                    if(!ratingErr && ratingCreated){
                        res.json({error:false,message:"User Registration Done!!",userCreated}).status(200)
                    }else{
                        res.json({error:true,message:ratingErr.message}).status(400)
                    }
                    
                }else{
                    res.json({error:true,message:walletErr.message}).status(400)
                }
            }else{
                res.json({error:true,message:reqError.message}).status(400)
            }
            
        }
    }
        

    

  
})

router.put('/api/v1/update_user/:id',UserUpadateValidate,rejectInvalid, async(req,res)=>{
  
    let user_id = req.params.id

    let [error,UserData] = await _p(User.findOne({
        where : {
            id : user_id
        }
    }))
    if(!error && UserData){
            let {firstName,lastName,phone,email,gander,dob,image} = req.body
            
            let [reqError,userUpdate] = await _p(User.update({
                firstName,lastName,phone,email,gander,dob,image,deviceId:UserData.deviceId,referId:UserData.referId
            },{ where : { id : user_id}}));

            if(reqError && !userUpdate){
                res.json({error:true,message:reqError.message}).status(400)
            }else{
                res.json({error:false,message:"User Update succefully!!"})
            }
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
    
})

router.get('/api/v1/user_by_id/:id',async(req,res)=>{
    let user_id = req.params.id

    let [error,UserData] = await _p(User.findOne({
        where : {
            id : user_id
        }
    }))

    if(!error,UserData){
        res.json(UserData).status(200)
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
})

router.get('/api/v1/user_by_phone/:phone',async(req,res)=>{
    let user_phone = req.params.phone
   // console.log(user_phone)
    let [error,UserData] = await _p(User.findOne({
        where : {
            phone : user_phone
        }
    }))

    if(!error,UserData){
        res.json(UserData).status(200)
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
})

router.get('/api/v1/is_user_by_phone/:phone',async(req,res)=>{
    let user_phone = req.params.phone
   // console.log(user_phone)
    let [error,UserData] = await _p(User.findOne({
        where : {
            phone : user_phone
        }
    }))

    if(!error,UserData){
        res.json({user:true}).status(200)
    }else{
        res.json({user:false}).status(400)
    }
})


router.put('/api/v1/user_deviceid_up/:phone', async (req,res)=>{
    let user_phone = req.params.phone
    let {deviceId} = req.body

    let [reqErr,Updated] = await _p(User.update({
        deviceId
    },{
        where : {
            phone : user_phone
        }
    }))

    if(!reqErr && Updated){
        res.json({error:false,message : "device id update"})
    }else{
        res.json({error:true,message: reqErr.message})
    }
    
})


/// Refer api---------------------------------------------
const refValidation = [
    check('userId').exists(),
    check('referId').exists()
]
router.post('/api/v1/refer',refValidation,rejectInvalid,async(req,res)=>{
    console.log(req.body)
    let {userId,referId} = req.body

    let [reqErr,referCreate] = await _p(Refer.create({
        userId,referId
    }))

    if(!reqErr,referCreate){
        res.json({error:true,message:"Refer Done!!"}).status(200)
    }else{
        res.json({error:true,message:reqErr.message}).status(400)
    }
})


router.get('/api/v1/refer/:refer_id',async(req,res)=>{
    let refer_id = req.params.refer_id
   console.log(refer_id)
    let [error,UserData] = await _p(Refer.findOne({
        include : [{ model: User}],
        where : {
            referId : refer_id
        },
        // include : [User]
    }))

    if(!error && UserData){
        res.json(UserData).status(200)
        console.log(UserData)
    }else{
        res.json({error:true,message:"user not found"}).status(400)
    }
})

//all all user to auth-admin




// router.delete('/api/v1/user/:id',(req,res)=>{
//     let id = req.params.id
//     User.destroy({
//         where :{
//             id : id
//         }
//     }).then(()=>{
//         res.json({
//             message : "User Deleted"
//         })
//     }).catch(e=>{
//         console.log(e)
//     })
// })
// router.get('/api/v1/user',(req,res)=>{
//     User.findAll().then(user=>{
//         res.json(user)
//     }).catch(e=>{
//         console.log(e)
//     })
// })

router.get('/api/v1/count_user',async(req,res)=>{
    let [reqErr,countUser] = await _p(User.count());
    if(!reqErr,countUser){
        res.json({error:false,countUser}).status(200)
    }else{
        res.json({error:true}).status(400)
    }
})


//user wallet 
router.get('/api/v1/all_user_wallet',async(req,res)=>{
    let [reqErr , AllUserWallet] = await _p(UserWallet.findAll({
        include : [User]
    }))
    if(!reqErr && AllUserWallet) {
        res.json({error:false,AllUserWallet})
        console.log(AllUserWallet[0].User.firstName)
    }else{
        res.json({error:true,message : reqErr.message})
    }
})

// user wallet recharge log

router.get('/api/v1/all_user_wallet_recharge_log', async(req,res)=>{
    let [reqErr , AllUserWalletRechargeLog] = await _p(UserWalletRecharge.findAll({}))
    if(!reqErr && AllUserWalletRechargeLog) {
        res.json({error:false,AllUserWalletRechargeLog})
    }else{
        res.json({error:true,message : reqErr.message})
    }
})


// let [rechargeErr,WalletRechargeCreate] = await _p(UserWalletRecharge.create({
//     UserId:userCreated.id,
//     firstName: userCreated.firstName,
//     rechargeAmount: 0,
//     transactionId: "init",
//     transactionType: "init"
// }))
// if(!rechargeErr && WalletRechargeCreate){

// }else{
//     res.json({error:true,message:rechargeErr.message}).status(400)
// }



//user serche query from user table

router.get('/api/v1/user_serach/:phone',(req,res) => {
    // let {query} = req.query
    let query = req.params.phone
    console.log(query)
    User.findAll({where : { phone : { [Op.like] : '%'+query+'%'} } })
    .then(data => {
        res.json(data)
        console.log(data)
    }).catch(e=>console.log(e))

})





module.exports = router;

