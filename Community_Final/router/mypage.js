const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

router.get('/mypage',function (req,res){
    var post;
    var comment;
    connection.db.query( 'select * from post where user_id = ? limit 3',1, async (error, result) => {
        if(error){
            console.log(error)
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('mypage.ejs',{mypage_post:[],mypageComment:[]})
        }
        post = result
        connection.db.query( 'select * from comment where user_id = ? limit 3',1, async (error, result) => {
            if(error){
                console.log(error);
            }
            // 해당 값이 없다면 :
            if( !result ){
                // return res.render(`index.ejs`,{ data : [] });
                return res.render('mypage.ejs')
            }
            comment = result
            return res.render('mypage.ejs',{mypage_post:post,mypageComment:comment})
        })
    })
})

// 게시글 수정  
router.post('/editpost',(req,res)=>{
    const {content,contentId} = req.body
    console.log("content,contentId",content,contentId)
    connection.db.query(`
        update post 
        set content = ?
        where post_id= ?`,
    [content,contentId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

// 게시글 삭제  
router.post('/deletepost',(req,res)=>{
    const {contentId} = req.body
    connection.db.query(`
        delete from post 
        where post_id = ?`,
    [contentId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

// 댓글 수정  
router.post('/editcomment',(req,res)=>{
    const {content,contentId} = req.body
    console.log("content,contentId",content,contentId)
    connection.db.query(`
        update comment 
        set content = ?
        where comment_id= ?`,
    [content,contentId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

// 댓글 삭제  
router.post('/deletecomment',(req,res)=>{
    const {contentId} = req.body
    connection.db.query(`
        delete from comment 
        where comment_id = ?`,
    [contentId],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.status(200).json({message:'success'})
    })
})

module.exports = router;
