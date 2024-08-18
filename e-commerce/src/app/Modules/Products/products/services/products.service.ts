import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categories, productsApi, productsPayload } from '../context/DTOS';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  searchValue = new BehaviorSubject("")

  getSearchValue():Observable<string>{
    return this.searchValue
  }
  setSearchValue(value:string){
    this.searchValue.next(value)
  }
  getAllProducts(data:productsPayload):Observable<productsApi>{
    
    return this.http.get<productsApi>(`https://dummyjson.com/products?limit=${data?.limit}&skip=${data.skip}`)
  }
  getProductsByCategory(data:productsPayload):Observable<productsApi>{
    return this.http.get<productsApi>(`https://dummyjson.com/products/category/${data.category}?limit=${data.limit}&skip=${data.skip}`)
  }
  getProductsByCategoryAndSearchKey(search:string):Observable<productsApi>{
    return this.http.get<productsApi>(`https://dummyjson.com/products/search?q=${search}&sortBy=${search}`)
  }
  getAllCategories():Observable<Categories[]>{
    return this.http.get<Categories[]>('https://dummyjson.com/products/categories')

  }

}
