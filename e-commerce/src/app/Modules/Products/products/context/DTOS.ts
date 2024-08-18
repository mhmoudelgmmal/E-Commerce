export interface productsAndCategories {
    products: productsApi;
    categories: Categories[];
    cart:number;
    isLoading:boolean;
    sortBy:string
}

export interface Categories {
    slug: string;
    name: string;
    url:  string;
    checked?:boolean
}
export interface productsApi {
    products:Products[];
    total:number
    skip:number
    limit:number
}
export interface Products {
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand:                string;
    sku:                  string;
    weight:               number;
    dimensions:           Dimensions;
    warrantyInformation:  string;
    shippingInformation:  string;
    availabilityStatus:   string;
    reviews:              Review[];
    returnPolicy:         string;
    minimumOrderQuantity: number;
    meta:                 Meta;
    images:               string[];
    thumbnail:            string;
    totalRate?:           number  
}

export interface Dimensions {
    width:  number;
    height: number;
    depth:  number;
}

export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode:   string;
    qrCode:    string;
}

export interface Review {
    rating:        number;
    comment:       string;
    date:          Date;
    reviewerName:  string;
    reviewerEmail: string;
}
export interface productsPayload {
    limit:number;
    skip:number;
    category?:string;
    search?:string;
  }