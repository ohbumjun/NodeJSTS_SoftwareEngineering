import { err,
    getHtmlElemByClassNm,
    getHtmlElemById,
    fetchReqInst } from "../utils/index.js";

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
    report() : void {throw 'override' }
    clickHandler(e:any):void{
        if(e.target.id == 'alertIcon'){
            fetchReqInst.reportContent(e.target)
        }
    }
    connectClickHandler() : void {
        this.contentsDiv!.addEventListener('click',this.clickHandler)
    }
}

export const subController = class{
    constructor(){}
    getHtmlElemByClassNm(className : string, domElem:HTMLElement|Document):HTMLElement|null{return domElem.querySelector(`.${className}`)}
}