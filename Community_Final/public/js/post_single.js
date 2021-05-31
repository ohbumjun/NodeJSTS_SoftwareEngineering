"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./classes/index.js");
const index_js_2 = require("./utils/index.js");
const reportComments = class extends index_js_1.reportUser {
    constructor(divClassName, targetClassName) {
        // constructor(){
        super(divClassName, targetClassName);
    }
    clickHandler(e) {
        if (e.target.id == 'alertIcon') {
            index_js_2.fetchReqInst.reportContent(e.target, "comment");
        }
    }
};
const reportCmtsInst = new reportComments('blog-comments', 'alertIcon');
reportCmtsInst.connectClickHandler();
