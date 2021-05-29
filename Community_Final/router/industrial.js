const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

router.get('/industrial',(req,res)=>{
    var industry;
    var review_comments;
    connection.db.query( 'select * from industry', async (error, result) => {
        if(error){
            console.log(error)
        }
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('industrial.ejs')
        }
        console.log("-----------------------")
        console.log("산업체 목록 결과",result)
        industry = result
        connection.db.query( 'select * from review', async (error, result) => {
            if(error){
                console.log(error);
            }
            // 해당 값이 없다면 :
            if( !result ){
                // return res.render(`index.ejs`,{ data : [] });
                return res.render('industrial.ejs')
            }
            console.log("-----------------------")
            console.log("해당 산업체 방문에 대한 리뷰",result)
            review_comments = result
            return res.render('industrial.ejs',{industry:post,industry_review:review_comments})
        })
    })
})

module.exports = router;
