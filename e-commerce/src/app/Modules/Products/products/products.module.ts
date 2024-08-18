import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { PathsComponent } from "../../../Shared/components/paths/paths.component";
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from "../../../Shared/components/pagination/pagination.component";
import { SeemorePipe } from 'src/app/Shared/pipes/seeMore/seemore.pipe';
import { LoadingComponent } from 'src/app/Shared/components/loading/loading.component';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PathsComponent,
    ReactiveFormsModule,
    PaginationComponent,
    HttpClientModule,
    SeemorePipe,
    LoadingComponent
]
})
export class ProductsModule { }
