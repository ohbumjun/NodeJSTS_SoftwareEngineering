const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

// 메인 페이지 

router.get('/', function(req,res){
    var review_name = '후기'
    connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 3) displayreview ',review_name, async (error, result) => {
        if(error){
            console.log(error)
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            console.log("asdfasdfsafsafs")
            return res.render('index.ejs')
        }
        review_post = result
        console.log("-----------------------")
        console.log("후기 게시판",review_post)
        var prepare_name = '준비'
        connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 3)displayprepare ',prepare_name, async (error, result) => {
            if(error){
                console.log(error);
            }
            // 해당 값이 없다면 :
            if( !result ){
                // return res.render(`index.ejs`,{ data : [] });
                return res.render('index.ejs')
            }
            prepare_post =result
            console.log("-----------------------")
            console.log("후기 게시판",prepare_post)
            var free_name = '자유'
            connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 3)displayreview ',free_name, async (error, result) => {
                if(error){
                    console.log(error);
                }
                // 해당 값이 없다면 :
                if( !result ){
                    // return res.render(`index.ejs`,{ data : [] });
                    return res.render('index.ejs')
                }
                free_post = result
                console.log("-----------------------")
                console.log("자유 게시판",result)
                return res.render('index.ejs',{review:review_post,prepare:prepare_post,free:free_post})
            })
        })
    })
})

// 후기 게시판
router.get('/feedbackboard', function(req,res){
    return res.render('feedbackboard.ejs')
})
// 후기 게시판 -- 개별 게시물 
router.get('/freeboard/post/:postId', function(req,res){
    return res.render('freeboard.ejs')
})

// 준비 게시판
router.get('/prepareboard', function(req,res){
    return res.render('prepareboard.ejs')
})
// 준비 게시판 -- 개별 게시물 
router.get('/freeboard/post/:postId', function(req,res){
    return res.render('freeboard.ejs')
})

// 자유 게시판 
router.get('/freeboard', function(req,res){
    return res.render('freeboard.ejs')
})
// 자유 게시판  -- 개별 게시물 
router.get('/freeboard/post/:postId', function(req,res){
    return res.render('freeboard.ejs')
})


// 마이페이지 프로그램 삭제
router.post('/myprogDelete', function(req,res){
    const ProgNum = req.body.Prog_Num
    const UserId  = req.user.Id
    connection.db_rest.query(`DELETE FROM projectparticipate
        WHERE 
        Client_Id = ? and
        Prog_Num = ? `,
        [UserId, ProgNum],
        (err, result) => {
            if(err){
                console.log(err)
                return res.status(404).json({ message : "failed"})
            }
            return res.status(200).json({ message : "success"})
    })
})



module.exports = router;