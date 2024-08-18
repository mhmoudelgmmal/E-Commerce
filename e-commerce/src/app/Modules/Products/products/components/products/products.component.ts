import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Path, categoriesList } from 'src/app/Shared/context/DTOS';
import { Categories, Products, productsApi, productsPayload } from '../../context/DTOS';
import { ProductsService } from '../../services/products.service';
import { Select, Store } from '@ngxs/store';
import { AddToCart, destroyAPIs, ProductsWithCategoryName, ProductsWithCategoryNameAndSearchKey, setIsloading } from './store/actions/products.actions';
import { ProductsState } from './store/state/products.state';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  
  product:string = ""
  sortBy:string = ""
  pathes:Path[] = []
  private productsSevice = inject(ProductsService)
  private fb = inject(FormBuilder)
  private Store = inject(Store)
  total!:number
  destroy$ = new Subject()
  @Select(ProductsState.isLoading) isLoading$!:Observable<boolean>
  @Select(ProductsState.productsData) productsData$!:Observable<productsApi>
  @Select(ProductsState.sortBy) sortBy$!:Observable<string>

  productsForm:FormGroup = this.fb.group({
    productsArray: this.fb.array([])
  })
  categoreisList:Categories[] = []
  productsList:Products[] = []
  limit:number = 0
  skip:number = 0
  getCategoriesAndProductsOnInit(){
    this.pathes  = [
      {name:"Home "},
      {name:" / "},
      {name:"Products"},
      {name:" / "},
      {name:"Smart Phones"},
      
    ]
    let data = {
          category:"smartphones",
          limit:10,
          skip:0
      }
    this.Store.dispatch( new setIsloading(true))
    let categories = this.productsSevice.getAllCategories()
    let products = this.productsSevice.getProductsByCategory(data)
    
    combineLatest({
      categories,
      products
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        
        if (res.categories) {
          this.categoreisList = []
          this.categoreisList = res.categories
          this.initFormArray()
        }
        if (res.products.products.length > 0) {
            this.productsList = res.products.products
            this.product = this.productsList[0].title
            this.productsList.forEach((parentData:any)=>{
              Object.entries(parentData).forEach(([key,value]:any)=>{
                if (key == 'reviews') {
                  let clientReview = 0
                  let totalReview = 0
                    value.forEach((element:any) => {
                      totalReview +=1
                      clientReview += element.rating
                    });
                    
                    parentData.totalRate = ((totalReview*10) - clientReview)/100
                }
              })
            })
            
            this.total = res.products.total
            this.limit = res.products.limit
            this.skip = res.products.skip
          }
        
        this.Store.dispatch( new setIsloading(false))
        
      },error:(err)=> {
        
        this.Store.dispatch( new setIsloading(false))
      },
    })
  }
  initFormArray(){
    for(let product of this.categoreisList){
      (this.productsForm.get('productsArray') as FormArray).push(
        product.slug == 'smartphones'? this.productFormGroup(product.name,product.slug,true) : this.productFormGroup(product.name,product.slug,false)
        
      )
    }

    
  }
  productFormGroup(name:string,slug:string,checked:boolean){
    return this.fb.group({
      name:name,
      slug:slug,
      checked:checked
    })
  }
  getProductsArrayToLoopInHTML(){
    return (this.productsForm?.get('productsArray') as FormArray)
  }
  ngOnInit(): void {
    this.getCategoriesAndProductsOnInit()
    this.productsData$.pipe(takeUntil(this.destroy$)).subscribe((res)=>{                
      if(res.products.length > 0){
        
        this.productsList = []
        this.productsList = res.products
        this.product = this.productsList[0].title

        this.productsList.forEach((parentData:any)=>{
          Object.entries(parentData).forEach(([key,value]:any)=>{
            if (key == 'reviews') {
              let clientReview = 0
              let totalReview = 0
                value.forEach((element:any) => {
                  totalReview +=1
                  clientReview += element.rating
                });
                
                parentData.totalRate = ((totalReview*10) - clientReview)/100
            }
          })
        })
        
        this.total = res.total
        this.limit = res.limit
        this.skip = res.skip
      }
      
    })
    this.productsSevice.getSearchValue().pipe(takeUntil(this.destroy$)).subscribe((res:string)=>{
      if (res) {     
       
        this.sortBy = res
        this.productsList = []
        this.Store.dispatch(new ProductsWithCategoryNameAndSearchKey(res)).subscribe((response)=>{
          this.pathes = [
              {name:"Home "},
              {name:" / "},
              {name:"Products"},
              {name:" / "},
              {name:res}, 
          ]
        })
      }
    })
    
  }
  getSkipValue(e:number){
    (this.productsForm.get('productsArray') as FormArray).controls.forEach((formGroup:AbstractControl) => {
      const elemnt = formGroup as FormGroup
      if (elemnt.get('checked')?.value == true) {
        this.Store.dispatch(new setIsloading(true))
        this.productsList = []
        let data:productsPayload = {
          category:elemnt.get('slug')?.value,
          limit:10,
          skip:((e *10) -10)
        }
        
        this.Store.dispatch(new ProductsWithCategoryName(data)).pipe(takeUntil(this.destroy$)).subscribe({
          next: (response:productsApi) => {
            this.total = response.total
            this.limit = response.limit
            this.skip = response.skip
            this.pathes = [
              {name:"Home "},
              {name:" / "},
              {name:"Products"},
              {name:" / "},
              {name:elemnt.get('name')?.value},                  
            ]
            this.Store.dispatch( new setIsloading(false))
            
          },error:(er:HttpErrorResponse)=>{
            this.Store.dispatch( new setIsloading(false))

          }
        }) 
      }      
      
    });
  }
  setFormControlCheckedValue(index:number,slug:string='smartphones',name:string='Smart Phones'){

    (this.productsForm?.get('productsArray') as FormArray).controls.forEach((element) => {
        element.get('checked')?.setValue(false, { emitEvent: false });
    });
    (this.productsForm?.get('productsArray') as FormArray).controls.at(index)?.get('checked')?.setValue(true)
    let data:productsPayload = {
      category:slug,
      limit:10,
      skip:0
    }
    this.Store.dispatch(new setIsloading(true))
    this.productsList = []
    this.Store.dispatch(new ProductsWithCategoryName(data)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response:productsApi) => {
        this.total = response.total
        this.limit = response.limit
        this.skip = response.skip
        this.pathes = [
          {name:"Home "},
          {name:" / "},
          {name:"Products"},
          {name:" / "},
          {name:name},                  
        ]
        this.Store.dispatch( new setIsloading(false))
        
      },error:(er:HttpErrorResponse)=>{
        this.Store.dispatch( new setIsloading(false))
        
      }
    })            
  }
  addToCart(){
    
    this.Store.dispatch( new AddToCart(1))
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
    this.Store.dispatch(new destroyAPIs())
  }
}
