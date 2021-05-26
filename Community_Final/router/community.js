const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/db.js');

// 메인 페이지 
router.get('/', function(req,res){
        return res.render('index.ejs')
})
// 후기 게시판
router.get('/feedbackboard', function(req,res){
    return res.render('feedbackboard.ejs')
})
// 준비 게시판
router.get('/prepareboard', function(req,res){
    return res.render('prepareboard.ejs')
})
// 자유 게시판 
router.get('/freeboard', function(req,res){
    return res.render('freeboard.ejs')
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