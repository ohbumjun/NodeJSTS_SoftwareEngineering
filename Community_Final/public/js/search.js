import { getHtmlElemByClassNm } from './utils/index.js';
// 검색 기능
class postProcessor {
    constructor() {
        this.searchTitle = () => {
            let query = this.searchTitleElem.value;
            console.log("query", query);
            this.searchTargets.forEach((post) => {
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
        this.connectEvtHandler = () => {
            this.searchTitleElem.addEventListener('keydown', this.searchTitle);
        };
        this.searchTargets = document.querySelectorAll('[data-search]');
        this.searchTitleElem = getHtmlElemByClassNm('post-search-input', document);
        console.log("this.searchTitleElem", this.searchTitleElem);
    }
}
const postProcessorInst = new postProcessor();
postProcessorInst.connectEvtHandler();
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
