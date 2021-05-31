# Industrial Visit Planning & Booking System (Community part)

## 1. Use cases
저희 프로젝트의 Community 파트는 총 5가지의 **Use case** 로 구분됩니다. 


각 Use case에 대한 간략한 설명을 하자면 
아래 기술된 사항들과 같습니다.

### Use case 1 : 커뮤니티 메인메뉴 디스플레이
***

커뮤니티 페이지의 방문자가 메인메뉴를 방문할 시 

후기, 준비, 자유 게시판 각각에서 조회수 기준 상위 3개의
게시글에 대한 정보를 볼 수 있습니다. 
 
### Use case 2 : 커뮤니티 게시물 검색
***

방문자는 커뮤니티의 메인 페이지에서 검색창에 키워드를 입력하여 

해당 키워드 내용을 제목으로 포함하고 있는
게시글들의 목록을 볼 수 있습니다.


###  Use case 3 : 커뮤니티 게시물 관리
***

1. 방문자는 조회하고자 하는 게시물을 클릭하여 해당 게시물의 제목, 내용, 댓글, 조회수 등을 확인할 수 있습니다.


2. 방문자가 메인 페이지에서 글 작성하기 버튼을 누른 후 글을 작성하면 해당 게시글의 카테고리에 해당하는 게시판에 작성한 게시글이 나타납니다.


3. 마이페이지에서 방문자는 본인이 작성한 수정하고자 하는 게시글을 선택하여 수정할 수 있습니다.


4. 마이페이지에서 방문자는 삭제하고자 하는 게시글을 선택하여 삭제할 수 있습니다.




###  Use case 4 : 커뮤니티 게시물 댓글 관리
***

방문자는 커뮤니티의 메인 페이지에서 검색창에 키워드를 입력하여 해당 키워드 내용을 제목으로 포함하고 있는
게시글들의 목록을 볼 수 있습니다.


###  Use case 5 : 산업체 패키지 후기 및 댓글 관리
***

1. 방문자는 특정 산업체 방문 예약 패키지 하단에 후기 작성하기 버튼을 클릭하여, 방문했던 산업체 패키지에 대한 후기를 남길 수 있습니다.


3. 방문자는 특정 게시글에 대하여 댓글을 작성할 수 있습니다.


5. 방문자는 마이 페이지에서 본인이 작성한 후기 혹은 특정 게시글에 대한 댓글을 수정하거나 삭제할 수 있습니다.


## 2. Domain Models
***
프로젝트에 사용된 Domain Model의 responsibility들입니다.


### Controller
***

Type은 D(data), C(Controller)이며 커뮤니티 페이지의 모든 activity들을 관리합니다.

아래와 같이 Controller는 subController로 정의되었습니다.
```javascript

export const subController = class{
    constructor(){}
    getHtmlElemByClassNm(className : string, domElem:HTMLElement|Document):HTMLElement|null{return domElem.querySelector(`.${className}`)}
}

```

그리고 마이페이지에 대한 컨트롤러는 따로 public/js/mypage.ts경로에 정의되어 있습니다.

```javascript
const mypageSubController = class extends subController{
    mypageDomElems : domElems = {'post':'','comment':''}
    constructor(postClassNm:string,cmtClassNm:string){
        super()
        this.mypageDomElems['post']   =document.querySelectorAll(`${postClassNm}`) as NodeListOf<HTMLElement>
        this.mypageDomElems['comment']=document.querySelectorAll(`${cmtClassNm}`) as NodeListOf<HTMLElement>
    }
    createClickHandler=(type:string)=>(e:any)=>{
        let editContentsDiv =getHtmlElemByClassNm(`${type}-edit-open`,e.currentTarget) as HTMLDivElement
        let editBtnsDiv     =getHtmlElemByClassNm(`${type}-edit-buttons`,e.currentTarget) as HTMLDivElement
        let content         =getHtmlElemByClassNm(`${type}-description`,e.currentTarget) as HTMLParagraphElement
        let editContent     =getHtmlElemByClassNm(`${type}-edit-input`,e.currentTarget) as HTMLTextAreaElement
        let contentId ;
        // display change
        if(e.target.id == `${type}-edit` || e.target.id == `${type}-cancel`){ // 수정 button
            // edit content에 내용 넣기 
            if(editContent && content) editContent.value = content.innerText
            new mypageServiceDisplay().ctrlEditDisplayHtml(editContentsDiv!,editBtnsDiv!)
        }
        // edit
        if(e.target.id==`${type}-insert`){
            contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
            if(!contentId) err(`No ${type} Id`) 
            if(editContent && contentId) fetchReqInst.editORdeleteContent(`/community/edit${type}`,{content:editContent.value,contentId:Number(contentId!.innerText)})
        }
        // delete
        if(e.target.id==`${type}-delete`){
            contentId = getHtmlElemByClassNm(`${type}-id`,e.currentTarget)
            if(!contentId) err(`No ${type} Id`) 
            fetchReqInst.editORdeleteContent(`/community/delete${type}`,{contentId:Number(contentId!.innerText)})
        }
    }
    assignClickHandler=()=>{
        this.mypageDomElems['post'].forEach((elem:HTMLElement)=>elem.addEventListener('click',this.createClickHandler('post')))
        this.mypageDomElems['comment'].forEach((elem:HTMLElement)=>elem.addEventListener('click',this.createClickHandler('comment')))
    }
}

```
마이 페이지에서 유저가 작성한 각 게시글, 댓글이 존재할 때 그에 해당하는 수정 및 삭제 버튼을 클릭했을때 발생하는 이벤트를 관리하는 

핸들러가 있습니다. 

위 클래스는 이러한 핸들러를 생성하는 createClickHandler 메서드, 그리고 html element에 clickhandler를 assign하는 assignClickHanlder 메서드로 구성됩니다.

### InputEntry
***
```
Type은 D(data), B(Boundary)이며 사용자가 입력한 값을 전달하는 데 사용됩니다.
```

### ServiceDisplay
***

Type은 D(data), B(Boundary)이며 웹페이지를 디스플레이 하는 역할을 합니다. 디스플레이 되는 템플릿은 .ejs 파일을 사용하고 있습니다.

유저 본인이 게시한 게시글, 댓글을 조회할 수 있는 마이페이지는 mypageServiceDisplay라는 클래스가 ServiceDisplay를 상속하여 디스플레이합니다.

* ServiceDisplay 클래스
```javascript
export const serviceDisplay = class {
    constructor() { }
    ctrlEditDisplayHtml(y_edit_Html:HTMLElement,n_edit_Html:HTMLElement):void{
        y_edit_Html.hidden = !y_edit_Html.hidden; n_edit_Html.hidden = !n_edit_Html.hidden 
    }
};
```

* mypageServiceDisplay 클래스
```javascript
const mypageServiceDisplay = class extends serviceDisplay {}

```

### UserInput
***
```
Type은 K(know), B(Boundary)이며 사용자의 입력 값을 저장합니다.
```

### DBOperator
***
Type은 D(Data), B(Boundary)이며 쿼리문을 받아 해당 쿼리문을 처리해서 결과를 받아오거나 그 결과를 DB에

입력합니다.

* DBOperator 클래스 코드
```javascript
export class DBOperator{
    constructor(){}
    getPostsPgDatas=(type:string)=>()=>{
        return new Promise((resolve,reject) =>{
            connection.db.query( `
            select * from 
                (select * from post where post_type = ? 
                    ORDER BY views DESC LIMIT 3) displayreview `,
            type, async (error:any, result:any) => {
                if(error){
                    console.log("user Error",error)
                    reject(new Error())
                }
                resolve(result)
            })
        })
    }
    getSgPostPgDatas=(type:string,postId:number)=>{
        let userInfo = this.getUserData(type,postId)
        let commentInfo = this.getCommentsData(postId)
        Promise.all([userInfo(),commentInfo()])
        .then((results:any)=>{
            let userInfo = results[0][0] // 객체 형태로 전달
            let commentInfo = results[1] // 배열 형태로 전달
            return res.render('post_single.ejs',{userInfo,commentInfo})
        })
        .catch(err=>console.log(err))
    }
    getUserData=(type,postId)=>()=>{
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from post 
                join user
                on post.user_id = user.user_id
                where post_type = ? and post_id = ?`,
                ["후기",postId], 
                async (error, userData) => {
                if(error){
                    // console.log("user Error",error)
                    reject(new Error())
                }
                resolve(userData)
            })
        })
    }
    
    getCommentsData=(postId)=>()=>{
        // Comment Info
        return new Promise((resolve,reject) =>{
            connection.db.query( `
                select * from comment 
                join user
                on comment.user_id = user.user_id
                where post_id = ?`,
                [postId], 
                async (error, commentData) => {
                if(error){
                    // console.log("comment Error",error)
                    reject(new Error())
                }
                resolve(commentData)
            })
        })
    }
}

```


### PostProcessor
***


Type은 D(Data), C(Controller)이며 이는 클래스로 다음과 같이 구현 되었습니다.
```javascript
class postProcessor{
    searchTargets: any;
    searchTitleElem : HTMLInputElement;
    constructor(){
        this.searchTargets = document.querySelectorAll('[data-search]') as NodeListOf<HTMLElement>
        this.searchTitleElem = getHtmlElemByClassNm('post-search-input',document) as HTMLInputElement
        console.log("this.searchTitleElem",this.searchTitleElem)
    }
    searchTitle=():void=>{
        let query = this.searchTitleElem!.value
        console.log("query",query)
        this.searchTargets.forEach((post:HTMLElement)=>{
            let postTitle = getHtmlElemByClassNm('title',post)?.textContent
            query.split('').map(word=>{
                if(postTitle!.toLowerCase().indexOf(word.toLowerCase())!=-1){ //항목 포함 
                    if(post.classList.contains('hidden'))post.classList.remove('hidden')
                }else{
                    if(!post.classList.contains('hidden'))post.classList.add('hidden')
                }
            })
        })
    }
    connectEvtHandler=()=>{
        this.searchTitleElem!.addEventListener('keydown',this.searchTitle)
    }
}
```
해당 클래스에는 게시글의 제목을 기준으로 검색을 수행하는 void 타입의 searchTitle이라는 메서드가 존재합니다.


즉 이 클래스는 게시글을 검색하는 기능을 수행하는 클래스입니다.

### PersonalInfoDisplay
***
```
Type은 K(know), B(Boundary)이며 유저에 대한 개인 정보를 디스플레이합니다.
```

### ReportUser
***

Type은 D(data), B(Boundary)이며 커뮤니티 정책을 위반하는 게시글 및 댓글을 신고합니다.

*reportUser 클래스 코드
```javascript
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
```

### RedirectUser
***
```
Type은 D(Data), B(Boundary)이며 사용자가 웹 페이지에서 버튼을 클릭하거나 웹 페이지에
url을 바꾸었을 때 이에 해당하는 페이지로 이동할 수 있도록 처리합니다.
```


## 3. Sequence Diagram
***

sequence diagram은 Use case 1,2를 제외하고 각 Use case별로 작성되었습니다.
각 use case별 sequence Diagram은 다음과 같습니다.
### Use Case 1,2
***
![1](https://user-images.githubusercontent.com/11494592/120093668-b8ff0100-c156-11eb-9581-6051aae185eb.PNG)
![2](https://user-images.githubusercontent.com/11494592/120093669-ba302e00-c156-11eb-9e4b-de7e038cde00.PNG)
![3](https://user-images.githubusercontent.com/11494592/120093675-c0bea580-c156-11eb-8814-273140de77a1.PNG)


위 sequence diagram은 유저가 메인 페이지에 들어왔을 때 각 게시판 별 조회수 기준 상위 3개 게시글을 디스플레이 하는 기능과
유저가 검색창에 검색 키워드를 입력했을 때 그 키워드에 해당하는 게시글들을 디스플레이 하도록 하는 기능,
그리고 메인 페이지에서 후기, 준비, 자유 라는 버튼을 클릭했을 때 클릭한 카테고리에 해당하는 게시글들을 디스플레이 하는 기능을
설명한 sequence diagram입니다.
### Use Case 3
***

![use case 3](https://user-images.githubusercontent.com/11494592/120093676-c4522c80-c156-11eb-93dd-d344f7509d6f.png)


유저가 게시글을 삭제, 수정, 작성할 때 발생하는 과정을 표현한 sequence diagram입니다.
### Use Case 4
***
![4](https://user-images.githubusercontent.com/11494592/120093681-cb793a80-c156-11eb-8d0d-e53080ebf4c2.PNG)
![5](https://user-images.githubusercontent.com/11494592/120093682-cc11d100-c156-11eb-970b-7f1aa7bf7cc9.PNG)
![6](https://user-images.githubusercontent.com/11494592/120093684-cd42fe00-c156-11eb-90ba-a75f2eb5e9b1.PNG)


게시물에 대한 댓글 작성, 삭제, 수정 그리고 커뮤니티 정책을 위반하는 댓글을 신고하는 기능을 표현한 sequence diagram입니다
### Use Case 5
***
![use case 5-1](https://user-images.githubusercontent.com/11494592/120093898-295a5200-c158-11eb-81cb-44b6bdfede4f.png)
![use case 5-2](https://user-images.githubusercontent.com/11494592/120093686-cf0cc180-c156-11eb-9dfe-35c73f9909b8.png)


산업체 패키지 후기 및 그 후기에 해당하는 댓글에 대한 작성, 편집, 삭제 기능을 나타낸 sequence diagram입니다.


## 4. 주요 기능
***
![슬라이드2](https://user-images.githubusercontent.com/11494592/120094229-28c2bb00-c15a-11eb-806a-82fe523708f3.JPG)

산업체 커뮤니티의 메인 페이지 화면입니다. 오른쪽 위 상단에 후기, 자유, 준비
게시판 등등을 클릭하면 각각 후기, 자유, 준비 게시판에 해당하는 페이지로 넘어갈 수 있습니다.  

***

***
![1  displayTop3 ](https://user-images.githubusercontent.com/11494592/120106311-7c072e80-c197-11eb-8423-e571c9a8ba07.PNG) 


해당 메인 페이지에서 스크롤해서 내려보면 위와 같이 자유, 후기, 준비 게시판 각각의 조회수 기준 상위 3개의 게시글들이
디스플레이 됨을 알 수 있습니다.
***
![슬라이드3](https://user-images.githubusercontent.com/11494592/120094230-295b5180-c15a-11eb-9dc2-3d0a6f0cbe50.JPG)
![슬라이드4](https://user-images.githubusercontent.com/11494592/120094231-29f3e800-c15a-11eb-95b2-68d4a7d1d8d5.JPG)
![슬라이드5](https://user-images.githubusercontent.com/11494592/120094232-2a8c7e80-c15a-11eb-9cf8-f872d438de12.JPG)

메인 페이지에서 각 후기, 자유, 준비 게시판에 대한 Read More 버튼을 클릭해서 각각 후기, 자유, 준비 게시판 페이지로 넘어갈 수 있습니다.

***
![슬라이드6](https://user-images.githubusercontent.com/11494592/120094234-2b251500-c15a-11eb-945f-66a4a6a26f89.JPG)

메인 페이지에서 스크롤을 내려보면, 위와 같이 각 게시판의 조회수 기준으로 top3에 들어가는 게시물들의 제목이 디스플레이 됩니다. 
이 페이지에서 각 게시물의 제목을 클릭하면 그 게시물에 해당하는 페이지로 이동합니다.
***
![슬라이드7](https://user-images.githubusercontent.com/11494592/120094236-2bbdab80-c15a-11eb-821d-4bf85324b1fc.JPG)

메인 페이지에 디스플레이 된 Top3 게시물 제목 중 하나를 클릭하거나, 각 자유, 후기, 준비 게시판의 게시물 리스트 중 하나를 클릭하면 이와 같이 해당 게시물에 대한 정보가 나타납니다.
***
![슬라이드8](https://user-images.githubusercontent.com/11494592/120094237-2bbdab80-c15a-11eb-9df3-32cc87896468.JPG)

각 게시물의 내용 구성은 위와 같습니다.


***
![슬라이드9](https://user-images.githubusercontent.com/11494592/120094238-2c564200-c15a-11eb-8bd0-3fc409df71c2.JPG)


각 게시글은 신고 버튼이 존재하며, ! 모양을 클릭할 시 해당 게시글을 신고할 수 있습니다.
***

***
![10](https://user-images.githubusercontent.com/11494592/120105984-3433d780-c196-11eb-95dc-9de261ff405e.PNG)

mypage는 현재 로그인한 유저가 작성한 게시글 및 댓글에 대한 목록이 나타납니다.

유저는 수정버튼을 클릭해 본인이 작성했던 게시글 혹은 댓글을 수정할 수 있으며, 삭제버튼을 눌러 본인이 작성했던 게시글 혹은 댓글을
삭제할 수 있습니다.

***
![11](https://user-images.githubusercontent.com/11494592/120106079-968cd800-c196-11eb-91d1-e19ac4ba8c0c.PNG)
메인페이지 우측 상단에 산업체라는 버튼을 클릭하면 위와 같은 산업체 패키지에 대한 페이지로 이동합니다.

해당 페이지는 산업체 패키지의 이름, 그리고 이에 대한 설명을 디스플레이합니다.
***
![12](https://user-images.githubusercontent.com/11494592/120106150-eec3da00-c196-11eb-91e3-989aee517a65.PNG)

조금 더 산업체 페이지에서 스크롤해서 내려보면 해당 패키지에 대한 후기 댓글들이 나타납니다. 
만일 후기 댓글들을 작성한 사람이 현재 로그인한 본인이라면 위와 같이 edit comment, delete comment 버튼이 나타나서 본인이 작성한 후기 댓글을 수정하거나 삭제할 수 있습니다.

그리고 맨 밑에 Leave a Reply 파트에 원하는 내용을 입력한 다음 post comment를 클릭하면 해당 내용의 후기 댓글이 작성됩니다.


## Built With


* [kuc00000](https://github.com/kuc00000)
  * Create README.md
  * write a part of backend code
  * make use case
  * make domain model
  * make sequence diagram for use case 1,2,4
  * make Database for project
* [ohbumjun](https://github.com/ohbumjun)
  * Write backend code
  * Implement frontend layout
  * make use case
  * make domain model
  * make sequence diagram for use case 3,5


## Acknowledgments / 감사의 말

* 백엔드 개발 경험이 없던 저에게 프론트엔드 개발을 하시면서도 많은 도움을 주시고 많은 시간을 투자해 주신 [ohbumjun](https://github.com/ohbumjun)님께 감사드립니다. 
