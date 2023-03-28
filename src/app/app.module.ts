import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProjectComponent } from './components/project/project.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ItemComponent } from './components/item/item.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjeUpdateComponent } from './components/proje-update/proje-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ProjectComponent,
    SupplierComponent,
    ItemComponent,
    LeftbarComponent,
    HomeComponent,
    ProjeUpdateComponent,
    SearchBarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
