"use strict";
// edit-open : hidden or not
// const mypagePostProcessor = class extends PostProcessor {}
const mypagePostProcessor = class {
};
let mypageDomElems = {
    'post': {
        totalDiv: document.querySelectorAll('[data-post]'),
    },
    'comment': {
        totalDiv: document.querySelectorAll('[data-comment]'),
    }
};
const getHtmlElement = (className, domElem) => domElem.querySelector(`.${className}`);
const ctrlEditDisplayHtml = (y_edit_Html, n_edit_Html) => {
    y_edit_Html.hidden = !y_edit_Html.hidden;
    n_edit_Html.hidden = !n_edit_Html.hidden;
};
const createClickHandler = (type) => (e) => {
    let editContentsDiv = getHtmlElement(`${type}-edit-open`, e.currentTarget);
    let editBtnsDiv = getHtmlElement(`${type}-edit-buttons`, e.currentTarget);
    let content = getHtmlElement(`${type}-description`, e.currentTarget);
    let editContent = getHtmlElement(`${type}-edit-input`, e.currentTarget);
    let contentId;
    if (e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`) { // 수정 button
        // edit content에 내용 넣기 
        if (editContent && content)
            editContent.value = content.innerText;
        ctrlEditDisplayHtml(editContentsDiv, editBtnsDiv);
    }
    // post
    if (e.target.id == `${type}-insert`) {
        console.log("click");
        contentId = getHtmlElement(`${type}-id`, e.currentTarget);
        console.log("contentId", contentId);
        if (!contentId)
            throw `No ${type} Id`;
        if (editContent && contentId)
            editFetch(editContent.value, Number(contentId.innerText), type);
    }
};
const mypageClickHandlers = {
    postClickHandler: createClickHandler('post'),
    commentClickHandler: createClickHandler('comment')
};
mypageDomElems['post'].totalDiv.forEach(elem => elem.addEventListener('click', mypageClickHandlers.postClickHandler));
mypageDomElems['comment'].totalDiv.forEach(elem => elem.addEventListener('click', mypageClickHandlers.commentClickHandler));
const editFetch = (content, contentId, type) => {
    console.log("hello");
    fetch(`/community/edit${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content, contentId
        })
    })
        .then(res => res.json())
        .then(res => {
        if (res.message == 'failed') {
            alert("Error");
        }
        else {
            window.location.reload();
        }
    });
};
let mypageCommentDiv = document.querySelector('.mypage-comment-div');
// 게시글 신고
let postsDiv = document.querySelector(`[data-class="singlePosts"]`);
const postClickHandler = (e) => {
    if (e.target.id == 'alertIcon') {
        const url = window.location.href.split('/');
        const boardType = url[url.length - 1];
        const postId = e.target.getAttribute('data-id');
        console.log("postId", postId);
        fetch(`/community/reportPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardType,
                postId
            })
        })
            .then(res => res.json())
            .then(res => {
            if (res.message == 'failed') {
                alert("Error");
            }
            else {
                alert("해당 게시글을 신고했습니다");
            }
        });
    }
};
postsDiv === null || postsDiv === void 0 ? void 0 : postsDiv.addEventListener('click', postClickHandler);
