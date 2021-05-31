"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// edit-open : hidden or not
const index_js_1 = require("./classes/index.js");
const index_js_2 = require("./utils/index.js");
const mypageServiceDisplay = class extends index_js_1.serviceDisplay {
};
const mypageSubController = class extends index_js_1.subController {
    constructor(postClassNm, cmtClassNm) {
        super();
        this.mypageDomElems = { 'post': '', 'comment': '' };
        this.createClickHandler = (type) => (e) => {
            let editContentsDiv = index_js_2.getHtmlElemByClassNm(`${type}-edit-open`, e.currentTarget);
            let editBtnsDiv = index_js_2.getHtmlElemByClassNm(`${type}-edit-buttons`, e.currentTarget);
            let content = index_js_2.getHtmlElemByClassNm(`${type}-description`, e.currentTarget);
            let editContent = index_js_2.getHtmlElemByClassNm(`${type}-edit-input`, e.currentTarget);
            let contentId;
            // display change
            if (e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`) { // 수정 button
                // edit content에 내용 넣기 
                if (editContent && content)
                    editContent.value = content.innerText;
                new mypageServiceDisplay().ctrlEditDisplayHtml(editContentsDiv, editBtnsDiv);
            }
            // edit
            if (e.target.id == `${type}-insert`) {
                contentId = index_js_2.getHtmlElemByClassNm(`${type}-id`, e.currentTarget);
                if (!contentId)
                    index_js_2.err(`No ${type} Id`);
                if (editContent && contentId)
                    index_js_2.fetchReqInst.editORdeleteContent(`/community/edit${type}`, { content: editContent.value, contentId: Number(contentId.innerText) });
            }
            // delete
            if (e.target.id == `${type}-delete`) {
                contentId = index_js_2.getHtmlElemByClassNm(`${type}-id`, e.currentTarget);
                if (!contentId)
                    index_js_2.err(`No ${type} Id`);
                index_js_2.fetchReqInst.editORdeleteContent(`/community/delete${type}`, { contentId: Number(contentId.innerText) });
            }
        };
        this.assignClickHandler = () => {
            this.mypageDomElems['post'].forEach((elem) => elem.addEventListener('click', this.createClickHandler('post')));
            this.mypageDomElems['comment'].forEach((elem) => elem.addEventListener('click', this.createClickHandler('comment')));
        };
        this.mypageDomElems['post'] = document.querySelectorAll(`${postClassNm}`);
        this.mypageDomElems['comment'] = document.querySelectorAll(`${cmtClassNm}`);
    }
};
const mypageSubCtlr = new mypageSubController('[data-post]', '[data-comment]');
mypageSubCtlr.assignClickHandler();
