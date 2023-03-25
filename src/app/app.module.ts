import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProjectComponent } from './components/project/project.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ItemComponent } from './components/item/item.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjeUpdateComponent } from './components/proje-update/proje-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ProjectComponent,
    SupplierComponent,
    ItemComponent,
    LeftbarComponent,
    HomeComponent,
    ProjeUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
