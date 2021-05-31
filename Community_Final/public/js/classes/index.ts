import { err,
    getHtmlElemByClassNm,
    getHtmlElemById
} from "../utils/index.js";

export const reportUser = class {
    contentId : number = 0 ;
    targetId : string = '';
    contentsDiv : HTMLElement | null = null ;
    constructor(divClassName : string, targetId : string){
        if(!getHtmlElemByClassNm(divClassName,document)) err(`No Html Elements with class ${divClassName}`)
        if(!getHtmlElemById(targetId,document)) err(`No Html Elements with class ${targetId}`)
        this.contentsDiv = getHtmlElemByClassNm(divClassName,document)
        this.targetId = targetId 
    }
    clickHandler(e:any):void{throw "must override"}
    connectClickHandler() : void {
        this.contentsDiv!.addEventListener('click',this.clickHandler)
    }
}

export const subController = class{
    constructor(){}
    getHtmlElemByClassNm(className : string, domElem:HTMLElement|Document):HTMLElement|null{return domElem.querySelector(`.${className}`)}
}
export class serviceDisplay {
    constructor() { }
    ctrlEditDisplayHtml(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement):void{
        y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
    }
    hello(){return console.log("hello")}
};