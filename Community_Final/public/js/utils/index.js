"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlElemById = exports.getHtmlElemByClassNm = exports.fetchReqInst = exports.err = void 0;
// error 
const err = (v) => { throw v; };
exports.err = err;
// 형 검사 
const info = class {
    checkData() { throw 'checkData must override'; }
};
const fetchInfo = class extends info {
    constructor(body) {
        super();
        this.body = body;
    }
    checkData() {
        if (!this.body.content)
            this.body.content = '';
        return this.body;
    }
};
const fetchReq = class {
    // edit | delete content 
    editORdeleteContent(url, body) {
        body = new fetchInfo(body).checkData();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: body.content,
                contentId: body.contentId
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
    }
    // report content(comment or post)
    reportContent(domElem, type) {
        const url = window.location.href.split('/');
        const boardType = url[url.length - 3];
        const commentId = domElem.getAttribute('data-id');
        fetch(`/community/report${type}`, {
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
                alert(`해당 ${type}을 신고했습니다`);
            }
        });
    }
};
exports.fetchReqInst = new fetchReq();
// get html elem
const getHtmlElemByClassNm = (className, domElem) => { return domElem.querySelector(`.${className}`); };
exports.getHtmlElemByClassNm = getHtmlElemByClassNm;
const getHtmlElemById = (id, domElem) => { return domElem.querySelector(`#${id}`); };
exports.getHtmlElemById = getHtmlElemById;
