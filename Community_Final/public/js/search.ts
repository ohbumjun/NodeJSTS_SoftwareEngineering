import { getHtmlElemByClassNm} from './utils/index.js'

// 검색 기능
class postProcessor{
    searchTargets: any;
    searchTitleElem : HTMLInputElement;
    constructor(){
        this.searchTargets = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
        this.searchTitleElem = getHtmlElemByClassNm('post-search-input',document) as HTMLInputElement
    }
    searchTitle=():void=>{
        let query = this.searchTitleElem!.value
        console.log("query",query)
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
    connectEvtHandler=()=>{
        this.searchTitleElem!.addEventListener('keydown',this.searchTitle)
    }
}

const postProcessorInst = new postProcessor()
postProcessorInst.connectEvtHandler()
