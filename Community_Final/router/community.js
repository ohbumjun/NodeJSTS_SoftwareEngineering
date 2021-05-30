const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

const { DBOperator } = require('./classes/index.js');
const DBOperInst = new DBOperator()
// 메인 페이지 
router.get('/', function(req,res){
    // 후기 게시판 
    let freeBoard = DBOperInst.getPostsPgDatas("자유")
    let feedbackBoard = DBOperInst.getPostsPgDatas("후기")
    let prepareBoard = DBOperInst.getPostsPgDatas("준비")
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
    let feedbackBoard = DBOperInst.getPostsPgDatas("후기")
    feedbackBoard()
    .then(result=>res.render('feedbackboard.ejs',{datas:result}))
    .catch(e=>res.render('feedbackboard.ejs',{datas:[]}))
})
// 후기 게시판 -- 개별 게시물 
router.get('/feedbackboard/post/:postId', async(req,res)=>{
    const {postId} = req.params
    let {userInfo,commentInfo} = await DBOperInst.getSgPostPgDatas('후기',postId)
    console.log("userInfo",userInfo)
    console.log("commentInfo",commentInfo)
    return res.render('post_single.ejs',{userInfo,commentInfo})
})
// 준비 게시판
router.get('/prepareboard', function(req,res){
    let prepareboard = DBOperInst.getPostsPgDatas("준비")
    prepareboard()
    .then(result=>res.render('prepareboard.ejs',{datas:result}))
    .catch(e=>res.render('prepareboard.ejs',{datas:[]}))
})
// 준비 게시판 -- 개별 게시물 
router.get('/prepareboard/post/:postId', async(req,res)=>{
    const {postId} = req.params
    let {userInfo,commentInfo} = await DBOperInst.getSgPostPgDatas('준비',postId)
    return res.render('post_single.ejs',{userInfo,commentInfo})
})
// 자유 게시판 
router.get('/freeboard', function(req,res){
    let freeboard = DBOperInst.getPostsPgDatas("자유")
    freeboard()
    .then(result=>res.render('freeboard.ejs',{datas:result}))
    .catch(e=>res.render('freeboard.ejs',{datas:[]}))
})
// 준비 게시판 -- 개별 게시물 
router.get('/freeboard/post/:postId', async(req,res)=>{
    const {postId} = req.params
    let {userInfo,commentInfo} = await DBOperInst.getSgPostPgDatas('자유',postId)
    return res.render('post_single.ejs',{userInfo,commentInfo})
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
