const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');


// 이야기
router.get('/', function(req,res){
    /*
    connection.db.query( 'SELECT * FROM post ', async (error, result) => {
        if(error){
            console.log(error);
        }
        // 해당 값이 없다면 : 
        if( !result ){
            // return res.render(`index.ejs`,{ data : [] });
            return res.render('index.ejs')
        }
    })
    */
    return res.render('index.ejs')
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