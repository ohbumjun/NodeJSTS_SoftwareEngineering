const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

// 메인 페이지 
router.get('/', function(req,res){
    // 후기 게시판 
    let feedbackBoard = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
            select * from 
                (select * from post where post_type = ? 
                    ORDER BY views DESC LIMIT 3) displayreview `,
            "후기", async (error, result) => {
                if(error){
                    console.log("user Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }

    // 준비 게시판 
    let prepareBoard = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `select * from 
                (select * from post where post_type = ? 
                    ORDER BY views DESC LIMIT 3)displayprepare`,
                    "준비", async (error, result) => {
                if(error){
                    console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }

    // 자유 게시판 
    let freeBoard = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from 
                    (select * from post where post_type = ? 
                        ORDER BY views DESC LIMIT 3)displayreview`,
                        "자유", async (error, result) => {
                if(error){
                    console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }

    Promise.all([feedbackBoard(),prepareBoard(),freeBoard()])
    .then(results=>{
        console.log("results from db", results)
        let review_post = results[0] 
        let prepare_post  = results[1] 
        let free_post  = results[2] 
        return res.render('index.ejs',{review:review_post,prepare:prepare_post,free:free_post})
    })
    .catch(err=>{return res.render('index.ejs',{review:[],prepare:[],free:[]})})
    
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
                join user
                on comment.user_id = user.user_id
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

    // async : promise가 resolve 되어 넘어올때까지 기다린다 
    Promise.all([userInfo(),commentInfo()])
    .then(results=>{
        let userInfo = results[0][0] // 객체 형태로 전달
        let commentInfo = results[1] // 배열 형태로 전달
        return res.render('post_single.ejs',{userInfo,commentInfo})
    })
    .catch(err=>console.log(err))
})

// 댓글 신고 
router.post('/reportComment',(req,res)=>{
    console.log("req",req.body)
    const {boardType,commentId} = req.body
    connection.db.query(`
    update comment 
    set report_type = 1
    where comment_id= ?`,
    [commentId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

// 게시글 신고 
router.post('/reportPost',(req,res)=>{
    const {boardType,postId} = req.body
    connection.db.query(`
        update post 
        set report_type = 1
        where post_id= ?`,
    [postId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

// 댓글 작성 
router.post('/writeComment',(req,res)=>{
    console.log("comment :", req.body.comment)
})



module.exports = router;
