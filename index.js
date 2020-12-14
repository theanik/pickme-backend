const express = require('express')
const bp = require('body-parser');
const user = require('./src/controller/user_controller')
const driver = require('./src/controller/driver_controller')
const admin = require('./src/controller/admin_controller')
const vehicle = require('./src/controller/vehicle_controller')
const promoCode = require('./src/controller/promocode_controller')
const region = require('./src/controller/region_controller')
const user_lat_long = require('./src/controller/user_lat_long_controller')
const dirver_lat_long = require('./src/controller/driver_lat_long_controller')
const map_view = require('./src/controller/map_view_controller')
const notification = require('./src/controller/push_notification')
const fare = require('./src/controller/fare_controller')
const ride = require('./src/controller/ride_controller')
const driverEarnInfo = require('./src/controller/driver_earninfo')
const complain = require('./src/controller/complain_controller')
const payment = require('./src/controller/payment_controller')

//checksum
const checksum = require('./src/router')

const auth = require('./src/middelware/auth')
const cors = require('./src/middelware/cros')
const app = express();

//middelware
app.use(cors)
app.use(bp.json());
app.use('/admin_api',auth)


//route

app.use(user)
app.use(driver)
app.use(admin)
app.use(vehicle)
app.use(promoCode)
app.use(region)
app.use(user_lat_long)
app.use(dirver_lat_long)
app.use(map_view)
app.use(notification)
app.use(ride)
app.use(fare)
app.use(driverEarnInfo)
app.use(complain)
app.use(payment)
app.use(checksum.route)
//start app
const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log('Rajdut Running on port : '+ _port)
})