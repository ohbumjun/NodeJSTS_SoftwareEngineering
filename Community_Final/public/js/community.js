import { reportUser } from "./classes/index.js";
const reportComments = class extends reportUser {
    constructor(divClassName, targetClassName) {
        // constructor(){
        super();
        if (this.inputError(divClassName))
            throw 'Error';
        if (this.inputError(targetClassName))
            throw 'Error';
        this.contentsDiv = document.querySelector(`.${divClassName}`);
        this.targetClassName = targetClassName;
        // super(commentId,className)
    }
    report() {
        return;
    }
    clickHandler(e) {
        if (e.target.classList.contains(this.targetClassName))
            this.executeClickHandler();
    }
    connectClickHandler(className) {
        this.contentsDiv.addEventListener('click', this.clickHandler);
    }
    executeClickHandler() { throw 'override'; }
};
const reportPosts = class extends reportUser {
    constructor() {
        super();
    }
    connectClickHandler(className) {
        return;
    }
    executeClickHandler() {
        return;
    }
};
let commentsDiv = document.querySelector('.blog-comments');
const commentClickHandler = (e) => {
    if (e.target.id == 'alertIcon') {
        const url = window.location.href.split('/');
        const boardType = url[url.length - 3];
        const commentId = e.target.getAttribute('data-id');
        fetch(`/community/reportComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardType,
                commentId
            })
        })
            .then(res => res.json())
            .then(res => {
            if (res.message == 'failed') {
                alert("Error");
            }
            else {
                alert("해당 댓글을 신고했습니다");
            }
        });
    }
};
commentsDiv === null || commentsDiv === void 0 ? void 0 : commentsDiv.addEventListener('click', commentClickHandler);
// 게시글 신고
let postsDiv = document.querySelector(`[data-class="singlePosts"]`);
const postClickHandler = (e) => {
    if (e.target.id == 'alertIcon') {
        const url = window.location.href.split('/');
        const boardType = url[url.length - 1];
        const postId = e.target.getAttribute('data-id');
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
