import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { ProjeUpdateComponent } from './components/proje-update/proje-update.component';
import { ProjectComponent } from './components/project/project.component';
import { SupplierComponent } from './components/supplier/supplier.component';

const routes: Routes = [
  {path:'item',component:ItemComponent},
  {path:'',component:HomeComponent},
  {path:'customer',component:CustomerComponent},
  {path:'supplier',component:SupplierComponent},
  {path:'project',component:ProjectComponent},
  {path:'home',component:HomeComponent},
  {path:'pupdate',component:ProjeUpdateComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
