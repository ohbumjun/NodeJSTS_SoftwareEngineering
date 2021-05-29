// edit-open : hidden or not
// const mypagePostProcessor = class extends PostProcessor {}

const mypagePostProcessor = class{

}

let mypageDomElems = {
    'post' : {
        totalDiv : document.querySelectorAll('[data-post]') as NodeListOf<HTMLElement>,
    },
    'comment' :{
        totalDiv : document.querySelectorAll('[data-comment]') as NodeListOf<HTMLElement>,
    }
}
const getHtmlElement=(className : string, domElem:HTMLElement):HTMLElement|null=> domElem.querySelector(`.${className}`)
const ctrlEditDisplayHtml=(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement)=>{
    y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
}
const createClickHandler=(type:string)=>(e:any)=>{
    let editContentsDiv = getHtmlElement(`${type}-edit-open`,e.currentTarget) as HTMLDivElement
    let editBtnsDiv     = getHtmlElement(`${type}-edit-buttons`,e.currentTarget) as HTMLDivElement
    let content         = getHtmlElement(`${type}-description`,e.currentTarget) as HTMLParagraphElement
    let editContent     = getHtmlElement(`${type}-edit-input`,e.currentTarget) as HTMLTextAreaElement
    let contentId ;
    if(e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`){ // 수정 button
        // edit content에 내용 넣기 
        if(editContent && content) editContent.value = content.innerText
        ctrlEditDisplayHtml(editContentsDiv!,editBtnsDiv!)
    }
    // post
    if(e.target.id==`${type}-insert`){
        console.log("click")
        contentId = getHtmlElement(`${type}-id`,e.currentTarget)
        console.log("contentId",contentId)
        if(!contentId) throw `No ${type} Id`
        if(editContent && contentId) editFetch(editContent.value,Number(contentId.innerText),type)
    }
}
const mypageClickHandlers = {
    postClickHandler    : createClickHandler('post'),
    commentClickHandler : createClickHandler('comment')
}
mypageDomElems['post'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.postClickHandler))
mypageDomElems['comment'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.commentClickHandler))
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
let mypageCommentDiv = document.querySelector('.mypage-comment-div')



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