export class allProducts {
    static readonly type = "[GET] Get All Products"
    constructor(public payload:object){}
}
export class ProductsWithCategoryName {
    static readonly type = "[GET] Get Products With Category Name"
    constructor(public payload:object){}
}
export class ProductsWithCategoryNameAndSearchKey {
    static readonly type = "[GET] Get Products With Category Name And Search Key"
    constructor(public payload:string){}
}
export class getAllCategories {
    static readonly type = "[GET] Get Categories"
    constructor(public payload:object){}
}
export class setIsloading {
    static readonly type = "[SET] setIsloading"
    constructor(public payload:boolean){}
}
export class AddToCart {
    static readonly type = "[SET] ADD TO CART"
    constructor(public payload:number){}
}
export class destroyAPIs {
    static readonly type = "Destroy APIS"
}