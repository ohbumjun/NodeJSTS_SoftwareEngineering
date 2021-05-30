import { reportUser } from "./classes/index.js";
import { fetchReqInst } from './utils/index.js';
const reportPosts = class extends reportUser {
    constructor(divClassName, targetClassName) {
        // constructor(){
        super(divClassName, targetClassName);
    }
    clickHandler(e) {
        if (e.target.id == 'alertIcon') {
            fetchReqInst.reportContent(e.target, "post");
        }
    }
};
const reportPostsInst = new reportPosts('singlePosts', 'alertIcon');
reportPostsInst.connectClickHandler();
