const connection = require('../../db/db.js');
// null object pattern
class nullPost{
    constructor(){
        this.post_id = -1
        this.title = "null"
        this.content = ''
        this.date = new Date()
        this.views = 1
        this.post_type = '후기'
        this.user_id = -1
        this.report_type = -1
    }
}
class nullComment{
    constructor(){
        this.comment_id = -1 
        this.post_id = -1
        this.posted_date = new Date()
        this.user_id = -1
        this.report_type = 7
        this.content = 'null'
    }
}

class DBOperator{
    constructor(){}
    getPostsPgDatas=(type)=>()=>{
        return new Promise((resolve,reject) =>{
            connection.db.query( `
            select * from 
                (select * from post where post_type = ? 
                    ORDER BY views DESC LIMIT 3) displayreview `,
            type, async (error, result) => {
                if(error){
                    console.log("user Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }
    getSgPostPgDatas=async(type,postId)=>{
        let userInfo = await this.getPostData(type,postId)
        let commentInfo = await this.getCommentsData(postId)
        return {userInfo,commentInfo}
    }
    hdErrPost=(postData)=>{if(!postData[0])return new nullPost()}
    getPostData=(type,postId)=>{
        return new Promise((resolve,reject)=>{
            connection.db.query( `
                select * from post 
                join user
                on post.user_id = user.user_id
                where post_type = ? and post_id = ?`,
                [type,postId], 
                async (error, postData) => {
                if(error){
                    console.log("user Error",error)
                }
                if(!postData[0]) resolve(this.hdErrPost(postData))
                else resolve(postData[0])
            })
        })
    }
    hdErrComment=(commentsData)=>{if(!commentsData[0])return [new nullComment()]}
    getCommentsData=(postId)=>{
        return new Promise((resolve,reject)=>{
            // Comment Info
            connection.db.query( `
                select * from comment 
                join user
                on comment.user_id = user.user_id
                where post_id = ?`,
                [postId], 
                async (error, commentsData) => {
                if(error){
                    console.log("comment Error",error)
                }
                if(!commentsData[0]) resolve(this.hdErrComment(commentsData))
                else resolve(commentsData)
            })
        })
        
    }
}

module.exports = {DBOperator}