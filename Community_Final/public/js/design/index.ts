export class nullPost{
    public post_id : number
    public title : string
    public content : string
    public date : Date
    public views : number
    public post_type : string
    public user_id : number
    public report_type : number
    constructor(){
        this.post_id = -1
        this.title = "null"
        this.content = ''
        this.date = new Date()
        this.views = 1
        this.post_type = '후기'
        this.user_id = -1
        this.report_type = -1
    }
}
export class nullComment{
    public comment_id : number
    public post_id : number
    public posted_date : Date
    public user_id : number
    public report_type : number
    public content : string
    constructor(){
        this.comment_id = -1 
        this.post_id = -1
        this.posted_date = new Date()
        this.user_id = -1
        this.report_type = 7
        this.content = 'null'
    }
}