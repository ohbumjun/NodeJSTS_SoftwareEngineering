// edit-open : hidden or not
import { subController,serviceDisplay } from "./classes/index.js";
import { err, fetchReqInst, getHtmlElemByClassNm } from "./utils/index.js";

// const mypagePostProcessor = class extends PostProcessor {}

interface domElems {
    'post' : any
    'comment': any
}

const mypageServiceDisplay = class extends serviceDisplay {}

const mypageSubController = class extends subController{
    mypageDomElems : domElems = {'post':'','comment':''}
    constructor(postClassNm:string,cmtClassNm:string){
        super()
        this.mypageDomElems['post']   =document.querySelectorAll(`${postClassNm}`) as NodeListOf<HTMLElement>
        this.mypageDomElems['comment']=document.querySelectorAll(`${cmtClassNm}`) as NodeListOf<HTMLElement>
    }
    createClickHandler=(type:string)=>(e:any)=>{
        let editContentsDiv =getHtmlElemByClassNm(`${type}-edit-open`,e.currentTarget) as HTMLDivElement
        let editBtnsDiv     =getHtmlElemByClassNm(`${type}-edit-buttons`,e.currentTarget) as HTMLDivElement
        let content         =getHtmlElemByClassNm(`${type}-description`,e.currentTarget) as HTMLParagraphElement
        let editContent     =getHtmlElemByClassNm(`${type}-edit-input`,e.currentTarget) as HTMLTextAreaElement
        let contentId ;
        // display change
        if(e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`){ // 수정 button
            // edit content에 내용 넣기 
            if(editContent && content) editContent.value = content.innerText
            new mypageServiceDisplay().ctrlEditDisplayHtml(editContentsDiv!,editBtnsDiv!)
        }
        // edit
        if(e.target.id==`${type}-insert`){
            contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
            if(!contentId) err(`No ${type} Id`) 
            if(editContent && contentId) fetchReqInst.editORdeleteContent(`/community/edit${type}`,{content:editContent.value,contentId:Number(contentId!.innerText)})
        }
        // delete
        if(e.target.id==`${type}-delete`){
            contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
            if(!contentId) err(`No ${type} Id`) 
            fetchReqInst.editORdeleteContent(`/community/delete${type}`,{contentId:Number(contentId!.innerText)})
        }
    }
    assignClickHandler=()=>{
        this.mypageDomElems['post'].forEach((elem:HTMLElement)=>elem.addEventListener('click',this.createClickHandler('post')))
        this.mypageDomElems['comment'].forEach((elem:HTMLElement)=>elem.addEventListener('click',this.createClickHandler('comment')))
    }
}

const mypageSubCtlr = new mypageSubController('[data-post]','[data-comment]')
mypageSubCtlr.assignClickHandler()

