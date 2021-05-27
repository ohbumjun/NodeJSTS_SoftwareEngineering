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
    var review_name = '후기'
    connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 6)displayprepare ',review_name, async (error, result) => {
        if(error){
            console.log(error);
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('index.ejs')
        }
        console.log("후기 게시판의 데이터들은?")
        console.log(result)
        return res.render('feedbackboard.ejs',{review:result})
    })
    
})

// 후기 게시판 -- 개별 게시물 
router.get('/feedbackboard/post/:postId', function(req,res){
    const {postId} = req.params
    console.log("postId" ,postId)

    // User Info
    let userInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from post 
                join user
                on post.user_id = user.user_id
                where post_type = ? and post_id = ?`,
                ["후기",postId], 
                async (error, userData) => {
                if(error){
                    // console.log("user Error",error)
                    reject(new Error())
                }
                resolve(userData)
            })
        })
    }

    // Comment Info
    let commentInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from comment 
                where post_id = ?`,
                [postId], 
                async (error, commentData) => {
                if(error){
                    // console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(commentData)
            })
        })
    }

    Promise.all([userInfo(),commentInfo()])
    .then(results=>{
        console.log("promise All results", results)
        console.log("userInfo", results[0])
        console.log("commentInfo",results[1])
        let userInfo = results[0][0] // 객체 형태로 전달
        let commentInfo = results[1] // 배열 형태로 전달
        return res.render('post_single.ejs',{userInfo,commentInfo})
    })
    .catch(err=>console.log(err))
})

// 준비 게시판
router.get('/prepareboard', function(req,res){
    var prepare_name = '준비'
    connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 6)displayprepare ',prepare_name, async (error, result) => {
        if(error){
            console.log(error);
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('index.ejs')
        }
        console.log("준비 게시판의 데이터들은?")
        return res.render('prepareboard.ejs',{prepare:result})
    })
})

// 준비 게시판 -- 개별 게시물 
router.get('/prepareboard/post/:postId', function(req,res){
    const {postId} = req.params
    console.log("postId" ,postId)

    // User Info
    let userInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from post 
                join user
                on post.user_id = user.user_id
                where post_type = ? and post_id = ?`,
                ["준비",postId], 
                async (error, userData) => {
                if(error){
                    // console.log("user Error",error)
                    reject(new Error())
                }
                resolve(userData)
            })
        })
    }

    // Comment Info
    let commentInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from comment 
                where post_id = ?`,
                [postId], 
                async (error, commentData) => {
                if(error){
                    // console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(commentData)
            })
        })
    }

    Promise.all([userInfo(),commentInfo()])
    .then(results=>{
        console.log("promise All results", results)
        console.log("userInfo", results[0])
        console.log("commentInfo",results[1])
        let userInfo = results[0][0] // 객체 형태로 전달
        let commentInfo = results[1] // 배열 형태로 전달
        return res.render('post_single.ejs',{userInfo,commentInfo})
    })
    .catch(err=>console.log(err))
})


// 자유 게시판 
router.get('/freeboard', function(req,res){
    var free_name = '자유'
    connection.db.query( 'select * from (select * from post where post_type = ? ORDER BY views DESC LIMIT 6)displayprepare ',free_name, async (error, result) => {
        if(error){
            console.log(error);
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('index.ejs')
        }
        console.log("자유 게시판의 데이터들은?")
        return res.render('freeboard.ejs',{free:result})
    })
})

// 자유 게시판 -- 개별 게시물 
router.get('/freeboard/post/:postId', function(req,res){
    const {postId} = req.params
    console.log("postId" ,postId)
    // User Info
    let userInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from post 
                join user
                on post.user_id = user.user_id
                where post_type = ? and post_id = ?`,
                ["자유",postId], 
                async (error, userData) => {
                if(error){
                    // console.log("user Error",error)
                    reject(new Error())
                }
                resolve(userData)
            })
        })
    }

    // Comment Info
    let commentInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from comment 
                where post_id = ?`,
                [postId], 
                async (error, commentData) => {
                if(error){
                    // console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(commentData)
            })
        })
    }

    Promise.all([userInfo(),commentInfo()])
    .then(results=>{
        console.log("promise All results", results)
        console.log("userInfo", results[0])
        console.log("commentInfo",results[1])
        let userInfo = results[0][0] // 객체 형태로 전달
        let commentInfo = results[1] // 배열 형태로 전달
        return res.render('post_single.ejs',{userInfo,commentInfo})
    })
    .catch(err=>console.log(err))
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