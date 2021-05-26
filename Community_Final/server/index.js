const express    = require('express');
const ejs        = require('ejs')
const cors        = require('cors')
const app        = express();
const path       = require("path");
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

// css.js 파일 사용 ---
app.use(express.static(path.join(__dirname +'../client/assets')))
// 그리고 아까 photo 가져올 때 질문하신거는, 데이터베이스에 src를 저장하고나면, 이후에 app.js 에서 app.use("/", express.static(path.join(__dirname, "images"))); 해두시면 url로 직접 들어가서 사진 가져올 수 있다

// Cookie Parser : 요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어  > express-session을 쓸 때는 필요 없다 
// app.use(cookieParser())
// app.set('port', 3100);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'../client'))
// app.use(express.static(__dirname + "../client/assets"));
app.engine('html', require('ejs').renderFile);

/* Cors 관련 문제 --------------------------------------------------------------------------------------------------------------------------
1 번째 방법 ) 
CORS란 Cross Origin Resource Sharing의 약자로, 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다. 
예를 들어, 도메인 http://A.com 에서 읽어온 HTML페이지에서 다른 도메인 http://B.com/image.jpg를 요청하는 경우를 말한다. 
이런 경우에 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다. 보안 상의 이유로, 브라우저는 CORS를 제한하고 있다.

이를 해결하기 위해서 가장 간단한 방법은, 서버(API 서버)의 응답 헤더를 변경해주는 것이다. 
서버의 헤더 중에는 Access-Control-Allow-Origin라는 프로퍼티가 있는데, CORS를 허용해 줄 도메인을 입력하는 곳이다. 
모든 곳에서 CORS를 허용하기 위해서는 모두를 의미하는 *를 입력하면 된다.

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 모든 출처를 허용한다는 의미인 *가 설정되어있기 때문에, 다른 출처에서 해당 사이트로 리소스를 요청할 때 CORS 정책 위반으로 인한 제약을 받지 않는다.
  res.header("Access-Control-Allow-Headers", "X-Requested-With");    >> 이는 이 요청이 Form이 아닌 비동기(AJAX) 요청임을 알려주기 위함이다.
  next();
});

*/

// proxy 신뢰해주기 
app.set('trust proxy', 1)

// Community --- 
const community = require('./router/community')
app.use('/community/', community)

// Industrial : 시골 상품
// const ProjectCountry = require('./server/router/industrial')
// app.use('/', ProjectCountry)

const server = app.listen(8001,function(){
  console.log("Server has started on port 8001");
});

