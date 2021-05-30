import { reportUser } from "./classes/index.js"

const reportComments = class extends reportUser{
    constructor(divClassName : string, targetClassName : string){
        // constructor(){
        super()
        if (this.inputError(divClassName)) throw 'Error'
        if (this.inputError(targetClassName)) throw 'Error'
        this.contentsDiv = document.querySelector(`.${divClassName}`)
        this.targetClassName = targetClassName        
        // super(commentId,className)
    }
    report(){
        return;
    }
    clickHandler(e:any):void{
        if(e.target.classList.contains(this.targetClassName))
            this.executeClickHandler()
    }
    connectClickHandler(className : string) : void {
        this.contentsDiv!.addEventListener('click',this.clickHandler)
    }
    executeClickHandler() : void {throw 'override'}
}

const reportPosts = class extends reportUser{
    constructor(){
        super()
    }
    connectClickHandler(className : string) : void {
        return;
    }
    executeClickHandler(){
        return;
    }
}

let commentsDiv = document.querySelector('.blog-comments')
const commentClickHandler=(e:any)=>{
    if(e.target.id == 'alertIcon'){
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
let postsDiv = document.querySelector(`[data-class="singlePosts"]`)
const postClickHandler=(e:any)=>{
    if(e.target.id == 'alertIcon'){
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


// 검색 기능
import {getHtmlElement,} from './mypage.js'
let searchedPosts = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
let searchBtn  = getHtmlElement('post-search-button',document)
let searchWordElem = getHtmlElement('post-search-input',document) as HTMLInputElement
const searchPosts=()=>{
    let query = searchWordElem.value
    searchedPosts.forEach((post:HTMLElement)=>{
        let postTitle = getHtmlElement('title',post)?.textContent
        query.split('').map(word=>{
            if(postTitle!.toLowerCase().indexOf(word.toLowerCase())!=-1){ //항목 포함 
                console.log("contain")
                if(post.classList.contains('hidden'))post.classList.remove('hidden')
            }else{
                if(!post.classList.contains('hidden'))post.classList.add('hidden')
            }
        })
    })
}
if(searchWordElem) searchWordElem.addEventListener('keydown',searchPosts)
