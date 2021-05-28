const express    = require('express');
const ejs        = require('ejs')
const cors       = require('cors')
const app        = express();
const path       = require("path");
const moment     = require('moment') 
require("dotenv").config();
const bodyParser = require('body-parser')

// Form data use
app.use(bodyParser.urlencoded({extended : false})) // support encoded req.bodies
// parse application/x-www-form-urlencoded
app.use(bodyParser.json())

// Allows our application to make HTTP requests to Express application
app.use(cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  // 모든 출처를 허용한다는 의미인 *가 설정되어있기 때문에, 다른 출처에서 해당 사이트로 리소스를 요청할 때 CORS 정책 위반으로 인한 제약을 받지 않는다.
  res.header("Access-Control-Allow-Headers", "X-Requested-With");    
  // >> 이는 이 요청이 Form이 아닌 비동기(AJAX) 요청임을 알려주기 위함이다.
  next();
});

// middleware - moment ( data formatting )
app.use((req, res, next)=>{
  res.locals.moment = moment;
  next();
});

// static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/vendor',express.static(__dirname+'public/vendor'))

// view ejs setting 
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'./views'))
app.engine('html', require('ejs').renderFile);

// Community --- 
const community = require('./router/community')
app.use('/community/', community)

// Mypage --- 
const mypage = require('./router/mypage')
app.use('/community/', mypage)

// Industrial 
const Industrial = require('./router/industrial')
app.use('/industrial/', Industrial)

const server = app.listen(8001,function(){
  console.log("Server has started on port 8001");
});