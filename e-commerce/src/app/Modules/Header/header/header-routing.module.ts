import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HeaderComponent,
    children:[
      {path:'',redirectTo:"login",pathMatch:'full'},
      {path:'login',loadChildren:()=>import('../../Auth/auth/auth.module').then((m)=>m.AuthModule),canActivate:[AuthGuard]},
      {path:'products',loadChildren:()=>import('../../Products/products/products.module').then((m)=>m.ProductsModule),canActivate:[AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
