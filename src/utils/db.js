const Sequelize = require('sequelize');
const CONNECTION_STRING = process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/rajdut_cab";
const db = new Sequelize(CONNECTION_STRING);

db.authenticate()
    .then(()=>{
        console.log('Database Connected!!');
    }).catch((err)=>{
        console.log('Database not connect'+err);
    })

db.sync().then(()=>{
    console.log('Database sync....');
}).catch(e=>{
    console.log('Database not sync....'+e.message);
})

module.exports = {
    db
}