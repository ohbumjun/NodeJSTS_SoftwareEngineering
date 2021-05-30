import { err, getHtmlElemByClassNm, getHtmlElemById } from "../utils/index.js";
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
    clickHandler(e) { throw "must override"; }
    connectClickHandler() {
        this.contentsDiv.addEventListener('click', this.clickHandler);
    }
};
export const subController = class {
    constructor() { }
    getHtmlElemByClassNm(className, domElem) { return domElem.querySelector(`.${className}`); }
};
export const serviceDisplay = class {
    constructor() { }
    ctrlEditDisplayHtml(y_edit_Html, n_edit_Html) {
        y_edit_Html.hidden = !y_edit_Html.hidden;
        n_edit_Html.hidden = !n_edit_Html.hidden;
    }
};
