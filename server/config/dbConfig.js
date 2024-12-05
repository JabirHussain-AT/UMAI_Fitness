const color = require('colors')
const mongoose  = require('mongoose') ;
const dotenv = require('dotenv')
dotenv.config()


const MONGO_URL  = String(process.env.MONGODB_URL)
// console.log("🚀 ~ file: dbConnection.ts:6 ~ MONGO_URL:", MONGO_URL)

const dbConnection = () => {
   mongoose.connect(String(MONGO_URL))
   .then(()=>{
    console.log(color.green('db connected with the service successfully '))
   })
   .catch((err  )=>{
    console.log(color.red('db connection failed in service with error ==>'),err)
   })
}

module.exports = dbConnection