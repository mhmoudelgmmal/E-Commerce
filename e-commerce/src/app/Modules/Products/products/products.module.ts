import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { PathsComponent } from "../../../Shared/components/paths/paths.component";
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from "../../../Shared/components/pagination/pagination.component";


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PathsComponent,
    ReactiveFormsModule,
    PaginationComponent
]
})
export class ProductsModule { }
