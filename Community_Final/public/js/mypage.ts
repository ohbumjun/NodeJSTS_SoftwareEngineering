// edit-open : hidden or not
import { subController } from "./classes/index.js";
import { err, fetchReqInst, getHtmlElemByClassNm } from "./utils/index.js";

// const mypagePostProcessor = class extends PostProcessor {}

interface domElems {
    'post' : any
    'comment': any
}

const mypageServiceDisplay = class{
    ctrlEditDisplayHtml(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement):void{
        y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
    }
}

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


/*

export const getHtmlElemByClassNm=(className : string, domElem:HTMLElement|Document):HTMLElement|null=> domElem.querySelector(`.${className}`)
const ctrlEditDisplayHtml=(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement)=>{
    y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
}
const createClickHandler=(type:string)=>(e:any)=>{
    let editContentsDiv = getHtmlElemByClassNm(`${type}-edit-open`,e.currentTarget) as HTMLDivElement
    let editBtnsDiv     = getHtmlElemByClassNm(`${type}-edit-buttons`,e.currentTarget) as HTMLDivElement
    let content         = getHtmlElemByClassNm(`${type}-description`,e.currentTarget) as HTMLParagraphElement
    let editContent     = getHtmlElemByClassNm(`${type}-edit-input`,e.currentTarget) as HTMLTextAreaElement
    let contentId ;
    // display change
    if(e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`){ // 수정 button
        // edit content에 내용 넣기 
        if(editContent && content) editContent.value = content.innerText
        ctrlEditDisplayHtml(editContentsDiv!,editBtnsDiv!)
    }
    // edit
    if(e.target.id==`${type}-insert`){
        contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
        if(!contentId) throw `No ${type} Id`
        if(editContent && contentId) editFetch(editContent.value,Number(contentId.innerText),type)
    }
    // delete
    if(e.target.id==`${type}-delete`){
        contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
        if(!contentId) throw `No ${type} Id`
        deleteFetch(Number(contentId!.innerText),type)
    }
}
const editFetch=(content:string,contentId:number,type:string)=>{
    console.log("hello")
    fetch(`/community/edit${type}`,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,contentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{window.location.reload()}
        })
}
const deleteFetch=(contentId:number,type:string)=>{
    console.log("contentId, type",contentId,type)
    fetch(`/community/delete${type}`,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{window.location.reload()} // 
        })
}
const mypageClickHandlers = {
    postClickHandler    : createClickHandler('post'),
    commentClickHandler : createClickHandler('comment')
}
mypageDomElems['post'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.postClickHandler))
mypageDomElems['comment'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.commentClickHandler))

mypageDomElems['post'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.postClickHandler))
mypageDomElems['comment'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.commentClickHandler))


let mypageDomElems = {
    'post'    : document.querySelectorAll('[data-post]') as NodeListOf<HTMLElement>,
    'comment' : document.querySelectorAll('[data-comment]') as NodeListOf<HTMLElement>,
}

*/