const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

router.get('/',(req,res)=>{
    var industry;
    var review_comments;
    connection.db.query( 'select * from industry', async (error, result) => {
        if(error){console.log(error)}
        // 해당 값이 없다면 :
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('industrial.ejs')
        }
        console.log("-----------------------")
        console.log("산업체 목록 결과",result)
        industry = result
        connection.db.query( 'select * from review', async (error, result) => {
            if(error){console.log(error);}
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

// 산업체 후기 작성 
router.post('/writeComment',(req,res)=>{
    const { review,package_id } = req.body
    console.log("req.body",req.body)
    const query = `INSERT INTO review (visitor_id,visit_time,industry_id,content,package_id)
                    VALUES (?,?,?,?,?) `
    const values = [3,new Date(),1,review,package_id]
    // insert 하기
    connection.db.query( query,values,(error, result) => {
        if(error){
            return res.status(400).json({message : 'failed'})
        }else{
            return res.redirect(`/industrial/industry/1`)
        }
    })
})

// 산업체 후기 편집
router.post('/editComment',(req,res)=>{
    const { review_id, review } = req.body
    console.log("req.body",req.body)
    connection.db.query(`
        update review 
        set content = ?
        where review_id= ?`,
    [review,review_id],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.redirect(`/industrial/industry/1`)
    })
})

// 산업체 후기 삭제 
router.post('/deleteComment',(req,res)=>{
    const { review_id } = req.body
    console.log("req.body",req.body)
    connection.db.query(`
    delete from review 
    where review_id = ?`,
    [review_id],
    (err, result) => {
        if(err){
            console.log(err)
            return res.status(404).json({message:'failure'})
        }
        return res.redirect('/industrial/industry/1')
    })
})

router.get('/industry/:industry_id',(req,res)=>{
    let packageInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from package 
                where industry_id = 1`, 
                async (error, packageData) => {
                if(error){
                    console.log("package Error",error)
                    reject(new Error())
                }
                resolve(packageData)
            })
        })
    }

    // Comment Info
    let reviewInfo = () => {
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from review 
                where package_id in (select package_id from package where
                    industry_id = 1)`, 
                async (error, reviewData) => {
                if(error){
                    console.log("review Error",error)
                    reject(new Error())
                }
                resolve(reviewData)
            })
        })
    }

    // async : promise가 resolve 되어 넘어올때까지 기다린다 
    Promise.all([packageInfo(),reviewInfo()])
    .then(results=>{
        let packageInfo = results[0][0] // 객체 형태로 전달
        let reviewInfo = results[1] // 배열 형태로 전달
        //밑에 render 부분의 ejs 파일은 수정하시면 될 것 같습니다.
        return res.render('industrial.ejs',{packageInfo,reviewInfo})
    })
    .catch(err=>console.log(err))
})

module.exports = router;
