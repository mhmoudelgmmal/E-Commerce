import { Categories, productsAndCategories } from './../../../../context/DTOS';
import { AddToCart, destroyAPIs, getAllCategories, ProductsWithCategoryNameAndSearchKey, setIsloading } from './../actions/products.actions';
import { Action, Actions, Selector, State, StateContext } from "@ngxs/store";
import { productsApi } from "../../../../context/DTOS";
import { inject, Injectable } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { allProducts, ProductsWithCategoryName } from "../actions/products.actions";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@State<productsAndCategories>({
    name: 'Products',
    defaults: {
        products:{
            products:[],
            total:0,
            skip:0,
            limit:0,
        },
        sortBy:"",
        categories:[],
        cart:0,
        isLoading:false
    }
})
@Injectable()
export class ProductsState {

    @Selector()
    static isLoading(state:productsAndCategories){
        return state.isLoading
    }
    @Selector()
    static productsData(state:productsAndCategories){
        return state.products
    }
    @Selector()
    static CartNumber(state:productsAndCategories){
        return state.cart
    }
    @Selector()
    static sortBy(state:productsAndCategories){
        return state.sortBy
    }
    private ProductsService = inject(ProductsService)
    destroy$ = new Subject()
    @Action(allProducts)
    getallProducts({patchState}:StateContext<productsAndCategories>,{payload}:any){
        patchState({
            products:{
                products:[],
                total:0,
                skip:0,
                limit:0,
            }
        })
        return this.ProductsService.getAllProducts(payload).pipe(
            takeUntil(this.destroy$),
            tap((res)=>{
                patchState({
                    products:{
                        products:res.products,
                        total:res.total,
                        skip:res.skip,
                        limit:res.limit,
                    },
                })
            }),
            catchError((err:HttpErrorResponse)=>{
                patchState({
                    products:{
                        products:[],
                        total:0,
                        skip:0,
                        limit:0,
                    },
                })
                return throwError(()=>err)
            })
        )
    }
    @Action(ProductsWithCategoryName)
    getProductsWithCategoryName({patchState}:StateContext<productsAndCategories>,{payload}:any){
        patchState({
            products:{
                products:[],
                total:0,
                skip:0,
                limit:0,
            },        
        })
        
        return this.ProductsService.getProductsByCategory(payload).pipe(
            takeUntil(this.destroy$),
            tap((res)=>{
                patchState({
                    products:{
                        products:res.products,
                        total:res.total,
                        skip:res.skip,
                        limit:res.limit,
                   },                   
                })
            }),
            catchError((err:HttpErrorResponse)=>{
                patchState({
                    products:{
                        products:[],
                        total:0,
                        skip:0,
                        limit:0,
                    },
                })
                return throwError(()=>err)
            })
        )
    }
    @Action(ProductsWithCategoryNameAndSearchKey)
    getProductsWithCategoryNameAndSearch({patchState}:StateContext<productsAndCategories>,{payload}:any){
        patchState({
            products:{
                products:[],
                total:0,
                skip:0,
                limit:0,
            },
            sortBy:""
        })
        return this.ProductsService.getProductsByCategoryAndSearchKey(payload).pipe(
            takeUntil(this.destroy$),
            tap((res)=>{
                patchState({
                    products:{
                        products:res.products,
                        total:res.total,
                        skip:res.skip,
                        limit:res.limit,
                    },
                    sortBy:payload
                })
            }),
            catchError((err:HttpErrorResponse)=>{
                patchState({
                    products:{
                        products:[],
                        total:0,
                        skip:0,
                        limit:0,
                    },
                    sortBy:""
                })
                return throwError(()=>err)
            })
        )
    }
    @Action(getAllCategories)
    getAllCategories({patchState}:StateContext<productsAndCategories>){
        patchState({
            categories:[],
        })
        return this.ProductsService.getAllCategories().pipe(
            takeUntil(this.destroy$),
            tap((res)=>{
                patchState({
                    categories:res,
                })
            }),
            catchError((err:HttpErrorResponse)=>{
                patchState({
                    categories:[],
                })
                return throwError(()=>err)
            })
        )
    }
    @Action(setIsloading)
    setIsloading({patchState}:StateContext<productsAndCategories>,{payload}:any){
        
        
        return patchState({
            isLoading:payload
        })
    }
    @Action(AddToCart)
    setAddToCart({patchState}:StateContext<productsAndCategories>,{payload}:any){
        
        let getCartItems = Number(localStorage.getItem('ecommerceCart'))
        if (getCartItems) {
            localStorage.setItem('ecommerceCart',(getCartItems+payload).toString())
            getCartItems = getCartItems + payload
        }else{
            localStorage.setItem('ecommerceCart',payload.toString())   
            getCartItems = payload
        }
              
        
        return patchState({
            cart:getCartItems
        })
    }
    @Action(destroyAPIs)
    destroyAPIs(){
        this.destroy$.next(true)
        this.destroy$.unsubscribe()
    }
}