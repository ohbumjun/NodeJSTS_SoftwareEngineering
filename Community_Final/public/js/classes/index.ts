export const reportUser = class {
    contentId : number = 0 ;
    targetClassName : string = '';
    contentsDiv : HTMLDivElement | null = new HTMLDivElement() ;
    constructor(){
    // constructor(contentId : number, className : string){
        // contentId : 댓글 혹은 게시글 id
        // this.contentsDiv = document.querySelector(`.${className}`)
    }
    inputError(className : string):boolean{return !document.querySelector(`.${className}`) ? true : false}
    report() : void {throw 'override' }
    sampleClickHandler(className : string, e : any ) : void {throw 'override'}
    connectClickHandler(className : string, e : any ) : void {throw 'override'}
    executeClickHandler() : void {throw 'override'}
}
