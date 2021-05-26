let mysql = require('mysql')
const dotenv = require('dotenv')
// telling dotenv, where is the file we want
dotenv.config({ path : './.env'})

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST , // server 에서 일하고 있다면, ip address를 넣으면 된다
    user : process.env.DATABASE_USER ,
    password : process.env.DATABASE_PASSWORD ,
    database : process.env.DATABASE ,
    insecureAuth : true
})

module.exports = {
    db
}
