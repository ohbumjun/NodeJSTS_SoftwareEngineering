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

// 검색 기능
const postProcessor = class {
    searchTargets: any;
    searchTitleElem : HTMLInputElement | null  = null;
    constructor(){
        this.searchTargets = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
        this.searchTitleElem = getHtmlElemByClassNm('post-search-input',document) as HTMLInputElement
    }
    searchTitle(){
        let query = this.searchTitleElem!.value
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
        this.searchTitleElem!.addEventListener('keydown',this.searchTitle)
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