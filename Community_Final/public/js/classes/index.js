export const reportUser = class {
    constructor() {
        this.contentId = 0;
        this.targetClassName = '';
        this.contentsDiv = new HTMLDivElement();
        // constructor(contentId : number, className : string){
        // contentId : 댓글 혹은 게시글 id
        // this.contentsDiv = document.querySelector(`.${className}`)
    }
    inputError(className) { return !document.querySelector(`.${className}`) ? true : false; }
    report() { throw 'override'; }
    sampleClickHandler(className, e) { throw 'override'; }
    connectClickHandler(className, e) { throw 'override'; }
    executeClickHandler() { throw 'override'; }
};
export const subController = class {
    constructor() { }
    getHtmlElement(className, domElem) { return domElem.querySelector(`.${className}`); }
};
