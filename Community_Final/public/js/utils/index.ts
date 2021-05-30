// error 
export const err=(v:string)=>{throw v;}

// 형 검사 
const info = class{
    checkData(){throw 'checkData must override'}
}
const fetchInfo = class extends info{
    body:reqBody;
    constructor(body:reqBody){
        super()
        this.body = body
    }
    checkData(){
        if(!this.body.content)this.body.content=''
        return this.body
    }
}

// fetch Req
interface reqBody {
    content?   : string
    contentId : number 
}
const fetchReq = class {
    // edit | delete content 
    editORdeleteContent(url:string,body:reqBody):void{
        body = new fetchInfo(body).checkData()
        fetch(url,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content : body.content,
                contentId : body.contentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{window.location.reload()}
        })
    }
    // report content(comment or post)
    reportContent(domElem:HTMLElement,type:string):void{
        const url = window.location.href.split('/')
        const boardType = url[url.length-3]
        const commentId = domElem.getAttribute('data-id')
        fetch(`/community/report${type}`,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                boardType,
                commentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res.message=='failed'){alert("Error")}
            else{alert(`해당 ${type}을 신고했습니다`)}
        })
    }
}

export const fetchReqInst = new fetchReq()

// get html elem
export const getHtmlElemByClassNm=(className : string, domElem:HTMLElement|Document):HTMLElement|null=>{return domElem.querySelector(`.${className}`)}
export const getHtmlElemById=(id:string,domElem:HTMLElement|Document):HTMLElement|null=>{return domElem.querySelector(`#${id}`)}
