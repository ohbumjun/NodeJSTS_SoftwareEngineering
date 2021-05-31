"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./utils/index.js");
// 검색 기능
class postProcessor {
    constructor() {
        this.searchTitle = () => {
            let query = this.searchTitleElem.value;
            console.log("query", query);
            this.searchTargets.forEach((post) => {
                var _a;
                let postTitle = (_a = index_js_1.getHtmlElemByClassNm('title', post)) === null || _a === void 0 ? void 0 : _a.textContent;
                query.split('').map(word => {
                    if (postTitle.toLowerCase().indexOf(word.toLowerCase()) != -1) { //항목 포함 
                        if (post.classList.contains('hidden'))
                            post.classList.remove('hidden');
                    }
                    else {
                        if (!post.classList.contains('hidden'))
                            post.classList.add('hidden');
                    }
                });
            });
        };
        this.connectEvtHandler = () => {
            this.searchTitleElem.addEventListener('keydown', this.searchTitle);
        };
        this.searchTargets = document.querySelectorAll('[data-search]');
        this.searchTitleElem = index_js_1.getHtmlElemByClassNm('post-search-input', document);
    }
}
const postProcessorInst = new postProcessor();
postProcessorInst.connectEvtHandler();
