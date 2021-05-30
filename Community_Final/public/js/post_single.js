import { reportUser } from "./classes/index.js";
import { getHtmlElemByClassNm } from './utils/index.js';
const reportComments = class extends reportUser {
    constructor(divClassName, targetClassName) {
        // constructor(){
        super(divClassName, targetClassName);
    }
    report() {
        return;
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
// 검색 기능
let searchedPosts = document.querySelectorAll('[data-search]');
let searchBtn = getHtmlElemByClassNm('post-search-button', document);
let searchWordElem = getHtmlElemByClassNm('post-search-input', document);
const searchPosts = () => {
    let query = searchWordElem.value;
    searchedPosts.forEach((post) => {
        var _a;
        let postTitle = (_a = getHtmlElemByClassNm('title', post)) === null || _a === void 0 ? void 0 : _a.textContent;
        query.split('').map(word => {
            if (postTitle.toLowerCase().indexOf(word.toLowerCase()) != -1) { //항목 포함 
                if (post.classList.contains('hidden'))
                    post.classList.remove('hidden');
            }
            else {
                if (!post.classList.contains('hidden'))
                    post.classList.add('hidden');
            }
        });
    });
};
if (searchWordElem)
    searchWordElem.addEventListener('keydown', searchPosts);
