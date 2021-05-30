const connection = require('../db/db.js');
import { err,
    getHtmlElemByClassNm,
    getHtmlElemById
} from "../utils/index.js";

export class DBOperator{
    constructor(){}
    getPostsPgDatas=(type:string)=>()=>{
        return new Promise((resolve,reject) =>{
            connection.db.query( `
            select * from 
                (select * from post where post_type = ? 
                    ORDER BY views DESC LIMIT 3) displayreview `,
            type, async (error:any, result:any) => {
                if(error){
                    console.log("user Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }
    getSgPostPgDatas=(type:string,postId:number)=>{
        let userInfo = this.getUserData(type,postId)
        let commentInfo = this.getCommentsData(postId)
        Promise.all([userInfo(),commentInfo()])
        .then((results:any)=>{
            let userInfo = results[0][0] // 객체 형태로 전달
            let commentInfo = results[1] // 배열 형태로 전달
            return res.render('post_single.ejs',{userInfo,commentInfo})
        })
        .catch(err=>console.log(err))
    }
    getUserData=(type,postId)=>()=>{
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
    
    getCommentsData=(postId)=>()=>{
        // Comment Info
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
}

export const reportUser = class {
    contentId : number = 0 ;
    targetId : string = '';
    contentsDiv : HTMLElement | null = null ;
    constructor(divClassName : string, targetId : string){
        if(!getHtmlElemByClassNm(divClassName,document)) err(`No Html Elements with class ${divClassName}`)
        if(!getHtmlElemById(targetId,document)) err(`No Html Elements with class ${targetId}`)
        this.contentsDiv = getHtmlElemByClassNm(divClassName,document)
        this.targetId = targetId 
    }
    clickHandler(e:any):void{throw "must override"}
    connectClickHandler() : void {
        this.contentsDiv!.addEventListener('click',this.clickHandler)
    }
}

export const subController = class{
    constructor(){}
    getHtmlElemByClassNm(className : string, domElem:HTMLElement|Document):HTMLElement|null{return domElem.querySelector(`.${className}`)}
}
export const serviceDisplay = class {
    constructor() { }
    ctrlEditDisplayHtml(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement):void{
        y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
    }
};