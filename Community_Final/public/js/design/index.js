export class nullPost {
    constructor() {
        this.post_id = -1;
        this.title = "null";
        this.content = '';
        this.date = new Date();
        this.views = 1;
        this.post_type = '후기';
        this.user_id = -1;
        this.report_type = -1;
    }
}
export class nullComment {
    constructor() {
        this.comment_id = -1;
        this.post_id = -1;
        this.posted_date = new Date();
        this.user_id = -1;
        this.report_type = 7;
        this.content = 'null';
    }
}
