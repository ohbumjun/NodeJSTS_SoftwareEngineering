import { reportUser } from "./classes/index.js"
import {err, fetchReqInst, getHtmlElemByClassNm} from './utils/index.js'

const reportPosts = class extends reportUser{
    constructor(divClassName : string, targetClassName : string ){
        // constructor(){
        super(divClassName,targetClassName)      
    }
    clickHandler(e:any):void{
        if(e.target.id == 'alertIcon'){
            fetchReqInst.reportContent(e.target,"post")
        }
    }
}
const reportPostsInst = new reportPosts('singlePosts','alertIcon')

reportPostsInst.connectClickHandler()
