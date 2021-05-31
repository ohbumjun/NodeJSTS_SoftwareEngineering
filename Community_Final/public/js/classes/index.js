"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDisplay = exports.subController = exports.reportUser = void 0;
const index_js_1 = require("../utils/index.js");
const reportUser = class {
    constructor(divClassName, targetId) {
        this.contentId = 0;
        this.targetId = '';
        this.contentsDiv = null;
        if (!index_js_1.getHtmlElemByClassNm(divClassName, document))
            index_js_1.err(`No Html Elements with class ${divClassName}`);
        if (!index_js_1.getHtmlElemById(targetId, document))
            index_js_1.err(`No Html Elements with class ${targetId}`);
        this.contentsDiv = index_js_1.getHtmlElemByClassNm(divClassName, document);
        this.targetId = targetId;
    }
    clickHandler(e) { throw "must override"; }
    connectClickHandler() {
        this.contentsDiv.addEventListener('click', this.clickHandler);
    }
};
exports.reportUser = reportUser;
const subController = class {
    constructor() { }
    getHtmlElemByClassNm(className, domElem) { return domElem.querySelector(`.${className}`); }
};
exports.subController = subController;
class serviceDisplay {
    constructor() { }
    ctrlEditDisplayHtml(y_edit_Html, n_edit_Html) {
        y_edit_Html.hidden = !y_edit_Html.hidden;
        n_edit_Html.hidden = !n_edit_Html.hidden;
    }
    hello() { return console.log("hello"); }
}
exports.serviceDisplay = serviceDisplay;
;
