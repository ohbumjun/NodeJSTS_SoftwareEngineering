import { reportUser } from "./classes/index.js"
import {err, fetchReqInst, getHtmlElemByClassNm} from './utils/index.js'

const reportPosts = class extends reportUser{
    constructor(divClassName : string, targetClassName : string ){
        // constructor(){
        super(divClassName,targetClassName)      
    }
    clickHandler(e:any):void{
        if(e.target.id == 'alertIcon'){
            fetchReqInst.reportContent(e.target,"post")
        }
    }
}
const reportPostsInst = new reportPosts('singlePosts','alertIcon')

reportPostsInst.connectClickHandler()

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
const postProcessor = class {
    searchTargets: any;
    searchTitleElem : HTMLInputElement = new HTMLInputElement();
    constructor(){
        this.searchTargets = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
        this.searchTitleElem = getHtmlElemByClassNm('post-search-input',document) as HTMLInputElement
    }
    searchTitle(){
        let query = this.searchTitleElem.value
        this.searchTargets.forEach((post:HTMLElement)=>{
            let postTitle = getHtmlElemByClassNm('title',post)?.textContent
            query.split('').map(word=>{
                if(postTitle!.toLowerCase().indexOf(word.toLowerCase())!=-1){ //항목 포함 
                    if(post.classList.contains('hidden'))post.classList.remove('hidden')
                }else{
                    if(!post.classList.contains('hidden'))post.classList.add('hidden')
                }
            })
        })
    }
    connectEvtHandler(){
        this.searchTitleElem.addEventListener('keydown',this.searchTitle)
    }
}
const postProcessorInst = new postProcessor()
if(getHtmlElemByClassNm('post-search-input',document)) postProcessorInst.searchTitle()
/*
let searchedPosts = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
let searchWordElem = getHtmlElemByClassNm('post-search-input',document) as HTMLInputElement
const searchPosts=()=>{
    let query = searchWordElem.value
    searchedPosts.forEach((post:HTMLElement)=>{
        let postTitle = getHtmlElemByClassNm('title',post)?.textContent
        query.split('').map(word=>{
            if(postTitle!.toLowerCase().indexOf(word.toLowerCase())!=-1){ //항목 포함 
                if(post.classList.contains('hidden'))post.classList.remove('hidden')
            }else{
                if(!post.classList.contains('hidden'))post.classList.add('hidden')
            }
        })
    })
}
if(searchWordElem)searchWordElem.addEventListener('keydown',searchPosts)
*/