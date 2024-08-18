import { ProductsService } from './../../../Modules/Products/products/services/products.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  standalone:true
})
export class SearchInputComponent {
  private ProductsService = inject(ProductsService)
  @Input() type!:string
  @Input() text!:string
  @Input() placeholder!:string
  @Input() name!:string
  @Output() dataChanged = new EventEmitter<string>();
  @Output() dataChangedOnBlur = new EventEmitter<string>();
  data: string = "";
 
  searchText(value:string){
    debugger
    this.ProductsService.setSearchValue(value)
  }
}
