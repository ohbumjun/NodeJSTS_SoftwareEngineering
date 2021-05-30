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

// 검색 게시판
router.get('/search', function(req,res){
    connection.db.query( 
        'select * from post',
        async (error, result) => {
        if(error){
            console.log(error);
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('search.ejs',{search : []})
        }
        return res.render('search.ejs',{search : result })
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
        return res.render('feedbackboard.ejs',{datas:result})
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
        return res.render('prepareboard.ejs',{datas:result})
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
        return res.render('freeboard.ejs',{datas:result})
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
router.post('/reportcomment',(req,res)=>{
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
router.post('/reportpost',(req,res)=>{
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

// 게시글 작성 페이지
router.get('/createPost',(req,res)=>{
    return res.render('createpost.ejs')
})

// 게시글 작성 
router.post('/createPost',(req,res)=>{
    const {post} = req.body
    //  INSERT INTO post VALUES(post_id, title, content, date, views, post_type, user_id, report_type);
    const postType = ["후기","준비","자유"]
    const randomIdx = Math.floor(Math.random()*postType.length)
    
    const query = `INSERT INTO post ( title,content,date,views,post_type,user_id)
                    VALUES (?,?,?,?,?,?) `
    const values = [`${postType[randomIdx]} 게시글`,post,new Date(),0,postType[randomIdx],1]
    // insert 하기
    connection.db.query( query,values,(error, result) => {
        if(error){
            return res.status(400).json({message : 'failed'})
        }else{
            return res.redirect('/community')
        }
    })

})

// 댓글 작성 
router.post('/writeComment',(req,res)=>{
    const { comment , post_id, post_type } = req.body
    const postKinds = {
        '후기' : 'feedbackboard',
        '자유' : 'freeboard',
        '준비' : 'prepareboard'
    }
    //  INSERT INTO post VALUES(post_id, title, content, date, views, post_type, user_id, report_type);
    const query = `INSERT INTO comment (post_id,posted_date,user_id,content)
                    VALUES (?,?,?,?) `
    const values = [post_id,new Date(),1,comment]
    
    // insert 하기
    connection.db.query( query,values,(error, result) => {
        if(error){
            return res.status(400).json({message : 'failed'})
        }else{
            return res.redirect(`/community/${postKinds[post_type]}/post/${post_id}`)
        }
    })
    
})



module.exports = router;
