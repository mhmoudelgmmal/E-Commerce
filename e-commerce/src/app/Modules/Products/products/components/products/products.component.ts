import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Path, productsList } from 'src/app/Shared/context/DTOS';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product:string = "iPhone"
  pathes:Path[] = []
  private fb = inject(FormBuilder)
  productsForm:FormGroup = this.fb.group({
    productsArray: this.fb.array([])
  })
  productsList:productsList[] = [
    { name:"All", count:240,checked:false},
    { name:"Smart phones", count:240,checked:true},
    { name:"Laptops", count:12,checked:false},
    { name:"Fragrances", count:8,checked:false},
    { name:"Skincare", count:16,checked:false},
    { name:"Groceries", count:12,checked:false},
    { name:"Home decoration", count:4,checked:false},
    { name:"Furniture", count:4,checked:false},
    { name:"Tops", count:42,checked:false},
    { name:"Women’s dresses", count:40,checked:false},
    { name:"Women’s shoes ", count:12,checked:false},
    { name:"Men’s shirts", count:12,checked:false},
    { name:"Men’s shoes", count:10,checked:false},
    { name:"Men’s watches", count:15,checked:false},
    { name:"Women’s watches ", count:7,checked:false},
    { name:"Women’s bags", count:9,checked:false},
    { name:"Women’s jewellery", count:5,checked:false},
    { name:"Sunglasses", count:13,checked:false},
    { name:"Automotive", count:6,checked:false},
    { name:"Motorcycle", count:14,checked:false},
    { name:"Lighting", count:0,checked:false},
  ]
  initFormArray(){
    for(let product of this.productsList){
      (this.productsForm.get('productsArray') as FormArray).push(
        this.productFormGroup(product.name,product.count,product.checked)
      )
    }
    console.log(this.productsForm);
    
  }
  productFormGroup(name:string,count:number,checked:boolean){
    return this.fb.group({
      name:name,
      count:count,
      checked:checked
    })
  }
  getProductsArrayToLoopInHTML(){
    return (this.productsForm?.get('productsArray') as FormArray)
  }
  ngOnInit(): void {
    this.pathes  = [
      {name:"Home "},
      {name:" / "},
      {name:"Products"},
      {name:" / "},
      {name:"Smart Phones"},
      {name:" / "},
      {name:"iPhone"},
    ]
    this.initFormArray();
  }
  setFormControlCheckedValue(index:number){
    
    (this.productsForm?.get('productsArray') as FormArray).controls.forEach((element) => {
        element.get('checked')?.setValue(false, { emitEvent: false });
    });
    (this.productsForm?.get('productsArray') as FormArray).controls.at(index)?.get('checked')?.setValue(true)
    console.log(this.productsForm.value);
    
  }

}
