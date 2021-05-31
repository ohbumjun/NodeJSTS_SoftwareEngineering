"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./classes/index.js");
const index_js_2 = require("./utils/index.js");
const reportComments = class extends index_js_1.reportUser {
    constructor(divClassName, targetClassName) {
        // constructor(){
        super(divClassName, targetClassName);
    }
    clickHandler(e) {
        if (e.target.id == 'alertIcon') {
            index_js_2.fetchReqInst.reportContent(e.target, "comment");
        }
    }
};
const reportCmtsInst = new reportComments('blog-comments', 'alertIcon');
reportCmtsInst.connectClickHandler();
/*
let commentsDiv = document.querySelector('.blog-comments')
const commentClickHandler=(e:any)=>{
    if(e.target.className.includes('alertIcon')){
        const url = window.location.href.split('/')
        const boardType = url[url.length-3]
        const commentId = e.target.getAttribute('data-id')
        fetch(`/community/reportComment`,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardType,
                commentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{alert("해당 댓글을 신고했습니다")}
        })
    }
}
commentsDiv?.addEventListener('click',commentClickHandler)


// 게시글 신고
let postsDiv = document.querySelector(`.singlePosts`)
const postClickHandler=(e:any)=>{
    if(e.target.className.includes('alertIcon')){
        const url = window.location.href.split('/')
        const boardType = url[url.length-1]
        const postId = e.target.getAttribute('data-id')
        console.log("postId",postId)
        fetch(`/community/reportPost`,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardType,
                postId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{alert("해당 게시글을 신고했습니다")}
        })
    }
}
postsDiv?.addEventListener('click',postClickHandler)

*/
