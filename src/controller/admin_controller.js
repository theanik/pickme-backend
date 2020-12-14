const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {Admin,Driver,User} = require('../../models/index')
const _p = require('../utils/promise_error')
const {generate} = require('../utils/password');
const {validate} = require('../utils/password');
const {app_secret} = require('../../config/config.json')

const AdminRegValidate = [
    check('name').exists(),
    check('userName').exists(),
    check('email').isEmail(),
    check('phone').exists(),
    check('password').isLength({min:6})
]

router.post('/admin_api/v1/register_admin', AdminRegValidate,async(req,res,next)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array)
        return res.status(422).json({ errors: errors.array() });
    }
    let passGen = generate(req.body.password);

    let password = `${passGen.salt}.${passGen.hash}`;

    let {name,userName,email,phone} = req.body;

    let [reqErr,AdminCreate] = await _p(Admin.create({
        name,userName,email,phone,password,role:1
    }));
    if(reqErr && !AdminCreate){
        res.status(400).json({error:true,message:reqErr.message});
    }
    else{
        res.json({message:"Admin created",error:false});
    }
})

let logInValidator = [
    check('userName').exists(),
    check('password').exists()
];

router.post("/api/v1/login_admin",logInValidator, async (req,res,next)=>{
    //console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors.array)
        return res.status(422).json({ errors: errors.array() });
    }
    let {userName,password} = req.body;
    let[reqErr,admin] = await _p(Admin.findOne({
        where:{
            userName
        }
    }));

    if(!admin && reqErr){
        res.json({
            error:true,
            message:"user not found",
        }).status(401)
    }else{
        console.log(admin.password);

        let [salt,hash] = admin.password.split('.');
        let {id,name,userName,email,phone,role} = admin;
        let valid = validate(password,hash,salt);

        if(valid){
            let token = jwt.sign({id,name,userName,email,phone,password,role},app_secret);
            res.json({
                error:false,
                token,
                admin_info:{
                    id,name,userName,email,phone,role
                }
            }).status(200)
        }else{
            res.json({
                message:"password Incorrect",
                error:true
            }).status(401)
        }
    }
})

//get add driver
router.get('/admin_api/v1/all_driver',async (req,res)=>{
    let [reqError,allDriver] = await _p(Driver.findAll())
    if(reqError && !allDriver){
        res.status(500).json({error:true,message:"something error"})
    }else{
        res.status(200).json(allDriver)
    }
})

//get single driver info
router.get('/admin_api/v1/driver/:id',async (req,res)=>{
    let driver_id = req.params.id;
    let [reqError,DriverInfo] = await _p(Driver.findOne({
        where : {
            id : driver_id
        }
    }))
    if(reqError && !DriverInfo){
        res.status(500).json({error:true,message:"something error"})
    }else{
        res.status(200).json(DriverInfo)
    }
})

//get add user
router.get('/admin_api/v1/all_user',async (req,res)=>{
    let [reqError,allUser] = await _p(User.findAll())
    if(reqError && !allUser){
        res.status(500).json({error:true,message:"something error"})
    }else{
        res.status(200).json(allUser)
    }
})

//get single User info
router.get('/admin_api/v1/user/:id',async (req,res)=>{
    let user_id = req.params.id;
    let [reqError,UserInfo] = await _p(User.findOne({
        where : {
            id : user_id
        }
    }))
    if(reqError && !UserInfo){
        res.status(500).json({error:true,message:"something error"})
    }else{
        res.status(200).json(UserInfo)
    }
})


//get all admin
router.get('/admin_api/v1/all_admin',async (req,res)=>{
    let [reqError,allAdmin] = await _p(Admin.findAll())
    if(reqError && !allAdmin){
        res.status(500).json({error:true,message:"something error"})
    }else{
        res.status(200).json(allAdmin)
    }
})


const AdminUpValidate = [
    check('name').exists(),
    check('userName').exists(),
    check('email').isEmail(),
    check('phone').exists(),
    check('password').isLength({min:6})
]

router.put('/admin_api/v1/update_admin/:id',AdminUpValidate, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let admin_id = req.params.id

    let [error,AdminData] = await _p(Admin.findOne({
        where : {
            id : admin_id
        }
    }))
    if(!error && AdminData){
        console.log(AdminData)
            let {name,userName,email,phone} = req.body;
            
            let [reqError,adminUpdate] = await _p(Admin.update({
                name,userName,email,phone
            },{ where : { id : admin_id}}));

            if(reqError && !adminUpdate){
                res.json({error:true,message:reqError.message}).status(400)
            }else{
                res.json({error:false,message:"Admin Update succefully!!"})
            }
    }else{
        res.json({error:true,message:"admin not found"}).status(400)
    }
    
})

router.delete('/admin_api/v1/delete_admin/:id',async(req,res)=>{
    let admin_id = req.params.id

    let [error,AdminData] = await _p(Admin.findOne({
        where : {
            id : admin_id
        }
    }))
    if(!error && AdminData){
        let [Err,AdminDelete] = await _p(Admin.destroy({
            where : {
                id : admin_id
            }
        }))
        if(!Err && AdminDelete){
            res.json({error:false,message:"Admin Delete succefully!!"}).status(200)
        }else{
            res.json({error:true,message:Err.message}).status(400)
        }
    }else{
        res.json({error:true,message:"admin not found"}).status(400)
    }

})





router.get('/api/v1/count_admin',async(req,res)=>{
    let [reqErr,countAdmin] = await _p(Admin.count());
    if(!reqErr,countAdmin){
        res.json({error:false,countAdmin}).status(200)
    }else{
        res.json({error:true}).status(400)
    }
})



module.exports = router;
