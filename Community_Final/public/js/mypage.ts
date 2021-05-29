// edit-open : hidden or not
// 

// const mypagePostProcessor = class extends PostProcessor {}

const mypagePostProcessor = class{

}

let mypageDomElems = {
    'post' : {
        postDiv : document.querySelector('#mypage-post-div') as HTMLElement,

        editContentsDiv : document.querySelector('.edit-open') as HTMLElement,
        insertBtn : document.querySelector('#post-insert') as HTMLElement,
        cancelBtn : document.querySelector('#post-cancel') as HTMLElement,
        
        editBtnDiv : document.querySelector('.edit-buttons') as HTMLElement,
        deleteBtn : document.querySelector('#post-delete') as HTMLElement,
        editBtn : document.querySelector('#post-edit') as HTMLElement,
    },
    'comment' :{
        mypageCommentDiv : document.querySelector('#mypage-comment-div') as HTMLElement,
    }
}

const mypagePostClickHandler = (e:any) => {
    console.log("click")
    if(e.target.id == 'post-edit'){ // 수정 button
        // edit-button div 숨기기
        mypageDomElems['post'].editBtnDiv.hidden = true;
        // edit-content 내용 보이게 하기
        mypageDomElems['post'].editContentsDiv.hidden = false;
    }
    if(e.target.id == 'post-cancel'){ // 취소 button
        // edit-button div 숨기기
        mypageDomElems['post'].editBtnDiv.hidden = false;
        // edit-content 내용 보이게 하기
        mypageDomElems['post'].editContentsDiv.hidden = true;
    }
}
mypageDomElems['post'].postDiv.addEventListener('click',mypagePostClickHandler)

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