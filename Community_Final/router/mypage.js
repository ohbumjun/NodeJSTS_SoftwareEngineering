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
        console.log("-----------------------")
        console.log("산업체 목록 결과",result)
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
            console.log("-----------------------")
            console.log("해당 산업체 방문에 대한 리뷰",result)
            comment = result
            return res.render('mypage.ejs',{mypage_post:post,mypageComment:comment})
        })
    })
})

// 게시글 수정  
router.post('/editpost',(req,res)=>{
    console.log("req",req.body)
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

// 댓글 수정  
router.post('/editomment',(req,res)=>{
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

module.exports = router;
