
export class loginUser {
    static readonly type = "[LOGIN] START LOGIN USER"
    constructor(public payload:object){}
}
export class setTokenOnLoadingHeaderComponent {
    static readonly type = "[HEADER] SET TOKEN ON LOAD"
    constructor(){}
}