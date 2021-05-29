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
const createClickHandler=(type:string)=>(e:any)=>{
    let editContents = getHtmlElement(`${type}-edit-open`,e.currentTarget)
    let editBtns = getHtmlElement(`${type}-edit-buttons`,e.currentTarget)
    if(e.target.id == `${type}-edit`){ // 수정 button
        editContents!.hidden = false;
        editBtns!.hidden = true;
    }
    if(e.target.id == `${type}-cancel`){ // 취소 button
        editContents!.hidden = true;
        editBtns!.hidden = false;
    }
}
const mypageClickHandlers = {
    postClickHandler : createClickHandler('post'),
    commentClickHandler : createClickHandler('comment')
}

mypageDomElems['post'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.postClickHandler))
mypageDomElems['comment'].totalDiv.forEach(elem=>elem.addEventListener('click',mypageClickHandlers.commentClickHandler))

let mypageCommentDiv = document.querySelector('.mypage-comment-div')

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