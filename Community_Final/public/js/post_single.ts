import { reportUser } from "./classes/index.js"
import {err, fetchReqInst, getHtmlElemByClassNm} from './utils/index.js'

const reportComments = class extends reportUser{
    constructor(divClassName : string, targetClassName : string){
        // constructor(){
        super(divClassName,targetClassName)      
    }
    clickHandler(e:any):void{
        if(e.target.id == 'alertIcon'){
            fetchReqInst.reportContent(e.target,"comment")
        }
    }
}
const reportCmtsInst = new reportComments('blog-comments','alertIcon')
reportCmtsInst.connectClickHandler()

