import { err, getHtmlElemByClassNm, getHtmlElemById, fetchReqInst } from "../utils/index.js";
export const reportUser = class {
    constructor(divClassName, targetId) {
        this.contentId = 0;
        this.targetId = '';
        this.contentsDiv = null;
        if (!getHtmlElemByClassNm(divClassName, document))
            err(`No Html Elements with class ${divClassName}`);
        if (!getHtmlElemById(targetId, document))
            err(`No Html Elements with class ${targetId}`);
        this.contentsDiv = getHtmlElemByClassNm(divClassName, document);
        this.targetId = targetId;
    }
    report() { throw 'override'; }
    clickHandler(e) {
        if (e.target.id == 'alertIcon') {
            fetchReqInst.reportContent(e.target);
        }
    }
    connectClickHandler() {
        this.contentsDiv.addEventListener('click', this.clickHandler);
    }
};
export const subController = class {
    constructor() { }
    getHtmlElemByClassNm(className, domElem) { return domElem.querySelector(`.${className}`); }
};
