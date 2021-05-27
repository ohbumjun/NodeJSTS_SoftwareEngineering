const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

router.get('/mypage',function (req,res){
    var post;
    var comment;
    connection.db.query( 'select * from post where user_id = ?',1, async (error, result) => {
        if(error){
            console.log(error)
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('mypage.ejs')
        }
        console.log("-----------------------")
        console.log("산업체 목록 결과",result)
        post = result
        connection.db.query( 'select * from comment where user_id = ?',1, async (error, result) => {
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

module.exports = router;
