const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const {Driver,DriverRefer,DriverEarnInfo,UserRating} = require('../../models/index')
const _p = require('../utils/promise_error')
const rejectInvalid = require('../middelware/reject_invalid')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var FCM = require('fcm-node');

const DriverRegisterValidate = [
    check('firstName').exists(),
    check('lastName').exists(),
    check('phone').exists().isLength({min:13,max:13}),
    check('email').isEmail().optional({nullable: true}),
    check('gander').exists(),
    check('dob').exists(),
    check('city').exists(),
    check('vehicleName').exists(),
    check('vehicleReg').exists(),
    check('vehicleType').exists(),
    check('deviceId').exists()
]
const DriverUpdateValidate = [
    check('firstName').exists(),
    check('lastName').exists(),
    check('phone').exists().isLength({min:13,max:13}),
    check('email').isEmail().optional({nullable: true}),
    check('gander').exists(),
    check('dob').exists(),
    check('city').exists(),
    check('vehicleName').exists(),
    check('vehicleReg').exists(),
    check('vehicleType').exists()
]



router.post('/api/v1/driver_register',DriverRegisterValidate, async(req,res,next)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let [emailErr ,PassEmail] = await _p(Driver.findOne({
        where :{
            email : req.body.email
        }
    }))
    let [phoneErr ,PassPhone] = await _p(Driver.findOne({
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
            let refId = req.body.firstName + Math.floor(Math.random() * 10000);
            let {firstName,lastName,phone,email,gander,dob,city,image,drivingLicence,insuranceImg,pancardImg,vehicleName,vehicleImg,
                vehicleReg,vehicleRegImg,vehicleType,deviceId} = req.body
        
            let [reqErr,DriverCreated] = await _p(Driver.create({
                firstName,
                lastName,
                phone,
                email,
                gander,
                dob,
                city,
                image,
                drivingLicence,
                insuranceImg,
                pancardImg,
                vehicleName,
                vehicleImg,
                vehicleReg,
                vehicleRegImg,
                vehicleType,
                isApprove : 0,
                deviceId,
                referId:refId,
                status : 0
            }))
        
            if(reqErr && !DriverCreated){
                res.json({error:true,message:reqErr.message}).status(400)
            }else{

                let[reqErr,Created] = await _p(DriverEarnInfo.create({
                    driverId : DriverCreated.id, phone : DriverCreated.phone, firstName : DriverCreated.firstName,
                     lastName : DriverCreated.lastName,
                     totalRide : 0 ,totalEarn : 0, wallet : 0,bonus : 0,rating : 0,ratingUserCount : 0
                }))
            
                if(!reqErr && Created){
                    res.json({error:false,message:"Driver Registration Done!!"}).status(200)
                }else{
                    res.json({error:true,message:reqErr.message}).status(401)
                }
                
            }
            
        }
    }

})

router.put('/api/v1/driver_update/:id',DriverUpdateValidate, async(req,res,next)=>{
    let driver_id = req.params.id

    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors.array)
        return res.status(422).json({ errors: errors.array() });
    }

    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            id : driver_id
        }
    }))
     if(!error && DriverData){
        let {firstName,lastName,phone,email,gander,dob,city,image,drivingLicence,insuranceImg,pancardImg,vehicleName,vehicleImg,
            vehicleReg,vehicleRegImg,vehicleType} = req.body

        let [reqErr,DriverCreated] = await _p(Driver.update({
            firstName,
            lastName,
            phone,
            email,
            gander,
            dob,
            city,
            image,
            drivingLicence,
            insuranceImg,
            pancardImg,
            vehicleName,
            vehicleImg,
            vehicleReg,
            vehicleRegImg,
            vehicleType
        },{ where :{ id : driver_id }}))

        if(reqErr && !DriverCreated){
            res.json({error:true,message:reqErr.message}).status(400)
        }else{
            res.json({error:false,message:"Driver Updated Done!!"}).status(200)
        }
     }else{
        res.json({error:true,message:"Driver not found"}).status(400)
     }
    
})

router.put('/api/v1/driver_deviceid_up/:phone', async (req,res)=>{
    let d_p = req.params.phone
    let {deviceId} = req.body

    let [reqErr,Updated] = await _p(Driver.update({
        deviceId
    },{
        where : {
            phone : d_p
        }
    }))

    if(!reqErr && Updated){
        res.json({error:false,message : "device id update"})
    }else{
        res.json({error:true,message: reqErr.message})
    }
    
})

router.put('/admin_api/v1/driver_approve/:id',async(req,res,next)=>{
    let driver_id = req.params.id
    console.log(driver_id)
    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            id : driver_id
        }
    }))
    if(!error && DriverData){
        let [reqErr,ApproveDriver] = await _p(Driver.update({
            isApprove : 1
        },{ where : { id : driver_id}}));

        if(!reqErr && ApproveDriver){
            console.log(ApproveDriver)
            res.json({error:false,message:"Driver Approve"})
        }else{
            res.json({error:true,message : reqErr.message})

        }
        
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
     }
})

router.put('/admin_api/v1/driver_ban/:id',async(req,res,next)=>{
    let driver_id = req.params.id

    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            id : driver_id
        }
    }))
    if(!error && DriverData){
        let [reqErr,ApproveDriver] = await _p(Driver.update({
            isApprove : 0
        },{ where : { id : driver_id}}));

        if(!reqErr && ApproveDriver)
            res.json({error:false,message:"Driver Ban"})
        else
            res.json({error:true,message : reqErr.message})
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
     }
})


router.get('/api/v1/driver_by_phone/:phone',async(req,res)=>{
    let driver_phone = req.params.phone
   // console.log(user_phone)
    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            phone : driver_phone
        }
    }))

    if(!error,DriverData){
        res.json(DriverData).status(200)
    }else{
        res.json({error:true,message:"driver not found"}).status(400)
    }
})

router.get('/api/v1/driver_by_id/:id',async(req,res)=>{
    let d_id = req.params.id
   // console.log(user_phone)
    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            id : d_id
        }
    }))

    if(!error,DriverData){
        res.json(DriverData).status(200)
    }else{
        res.json({error:true,message:"driver not found"}).status(400)
    }
})

router.get('/api/v1/is_driver_by_phone/:phone',async(req,res)=>{
    let driver_phone = req.params.phone
   // console.log(user_phone)
    let [error,DriverData] = await _p(Driver.findOne({
        where : {
            phone : driver_phone
        }
    }))

    if(!error,DriverData){
        res.json({driver:true}).status(200)
    }else{
        res.json({driver:false}).status(400)
    }
})

//update lat long 



router.put('/api/v1/driver_active/:id',async(req,res)=>{
    let d_id = req.params.id;
    let [reqError,DriverData] = await _p(Driver.findOne({
        where:{
            id : d_id
        }
    }))

    if(!reqError && DriverData){

        let [reqErr,DriverActive] = await _p(Driver.update({
            status : 1
        },{
            where:{
                id : d_id
            }
        }))
        if(!reqErr && DriverActive){
            res.json({error:false,message:"driver active"}).status(200)
        }else{
            res.json({error:true,message : reqErr.message}).status(400)
        }
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
    }
})

router.put('/api/v1/driver_deactive/:id',async(req,res)=>{
    let d_id = req.params.id;
    let [reqError,DriverData] = await _p(Driver.findOne({
        where:{
            id : d_id
        }
    }))

    if(!reqError && DriverData){

        let [reqErr,DriverDeactive] = await _p(Driver.update({
            status : 0
        },{
            where:{
                id : d_id
            }
        }))
        if(!reqErr && DriverDeactive){
            res.json({error:false,message:"driver deactive"}).status(200)
        }else{
            res.json({error:true,message : reqErr.message}).status(400)
        }
    }else{
        res.json({error:true,message:"Driver not found"}).status(400)
    }
})



/// Refer api---------------------------------------------
const refValidation = [
    check('driverId').exists(),
    check('referId').exists()
]
router.post('/api/v1/driver_refer',refValidation,rejectInvalid,async(req,res)=>{
    console.log(req.body)
    let {driverId,referId} = req.body

    let [reqErr,referCreate] = await _p(DriverRefer.create({
        driverId,referId
    }))

    if(!reqErr,referCreate){
        res.json({error:false,message:"Driver Refer Done!!"}).status(200)
    }else{
        res.json({error:true,message:reqErr.message}).status(400)
    }
})

router.get('/api/v1/count_driver',async(req,res)=>{
    let [reqErr,countDriver] = await _p(Driver.count());
    if(!reqErr,countDriver){
        res.json({error:false,countDriver}).status(200)
    }else{
        res.json({error:true,message:reqErr.message}).status(400)
    }
})

router.get('/api/v1/count_actice_driver',async(req,res)=>{
    let [reqErr,countActiveDriver] = await _p(Driver.count({
        where :{
            status : 1
        }
    }));
    if(!reqErr,countActiveDriver){
        res.json({error:false,countActiveDriver}).status(200)
    }else{
        res.json({error:true,message:reqErr.message}).status(400)
    }
})



// add bouns

router.put('/api/v1/add_driver_bonus/:id', async (req,res)=>{
    let id = req.params.id
    let {bonus , bonusType} = req.body
    let [Err,BonusUpdate] = await _p(DriverEarnInfo.update({
        bonus
    },{
        where : {
            driverId : id
        }
    }))

    let [err,DriverData] = await _p(Driver.findOne({
        where : {
            id : id
        }
    }))


    if(BonusUpdate){

        var serverKey = 'AAAAJU7btJ4:APA91bGPizbD5KwI2iTXTl7i5OPa2tmI6yvwBXuZFOcuB90_76uIQdeKpVp-YQuqDeqgqcwDQPcLLbuvYiHJBV2vvqlgalwe1ZInB-ucVmQYMsoPiReLF4oAZfempO_1CO4Jht6WmI2F';
        var fcm = new FCM(serverKey);
        
        var token = DriverData.deviceId
        var title = bonusType
        var body = 'Dear '+ DriverData.firstName + ' You have got '+bonus+' Rupi '+bonusType
        console.log("Token Value  :   " + token);
        var message = {
            to: token,
            collapse_key: 'AIzaSyBgdBiElF0PNsS_ewTZNQ68p1SzJZO8y3o',
            // click_action:'FLUTTER_NOTIFICATION_CLICK',
            notification: {title, body, "click_action":"FLUTTER_NOTIFICATION_CLICK",},
            data: {my_key: 'my value', contents: "abcv/",
            title ,
            body,
            "click_action":"FLUTTER_NOTIFICATION_CLICK"}
        };
        fcm.send(message, await function _p(err, response) {
            if (err) {
                res.json({status: 0, message: err});
                console.log("error : "+err);
            } else {
                console.log("MESSAGE SEND");
                res.json({status: 1, message: response});
            }
        })
    }else{
        res.json({err:true,message : Err.message})
    }
})








//driver rate user

router.put('/api/v1/driver_rating_to_user/:id', async(req,res)=>{
    let user_id = req.params.id
    let [reqErr,UserInfoData] = await _p(UserRating.findOne({
        where :{
            userId : user_id
        }
    }))

    if(!reqErr && UserInfoData){
        let {rating} = req.body
        var newRating = UserInfoData.rating + rating
        var newDriverCount = UserInfoData.coutRatingDriver + 1

        let [Err, Update] = await _p(UserRating.update({
            rating : newRating,
            coutRatingDriver : newDriverCount

        },{
            where :{
                userId : user_id
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

//driver serche query from driver table

router.get('/api/v1/driver_serach/:phone',(req,res) => {
    // let {query} = req.query
    let query = req.params.phone
    console.log(query)
    Driver.findAll({where : { phone : { [Op.like] : '%'+query+'%'} } })
    .then(data => {
        res.json(data)
        console.log(data)
    }).catch(e=>console.log(e))

})

//demo rating api

router.post('/api/v1/demo_rate',async(req,res)=>{
    let {userId} = req.body
    let [reqErr, Created] = await _p(UserRating.create({
        userId
    }))
    if(!reqErr && Created){
        res.json({error:false,message : "Created"})
    }else{
        res.json({error:true})
    }
})






module.exports = router; 