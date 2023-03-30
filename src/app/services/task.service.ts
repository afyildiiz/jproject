import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Customer } from '../customer';
import { Item } from '../item';
import { Pipeline } from '../pipeline';
import { Supplier } from '../supplier';

import { baseUrl } from '../utils/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  recentlyViewedComponents: string[] = [];

  addRecentlyViewedComponent(componentName: any): void {
    if (this.recentlyViewedComponents.length >= 3) {
      this.recentlyViewedComponents.shift();
    }
    this.recentlyViewedComponents.push(componentName);
  }

  getRecentlyViewedComponents(): string[] {
    return this.recentlyViewedComponents;
  }


  
  constructor(private http:HttpClient) { }

  getToken(){
    return "22888172637357163625"
    // return localStorage.getItem('token')
  }

  getCurrentUserId(){
    return localStorage.getItem('userId')
  }

  getSuppliers(){
    const body={
      Token:this.getToken(),
      DataStoreId:'42268645312412746174',
      Operation:'read',
      Encrypted:1951,
      Data:'select * from "postgres".public.j_suppliers'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }
  insertSuppliers(data:Supplier){
    const body={
      Token:this.getToken(),
      DataStoreId:'42268645312412746174',
      Operation:'read',
      Encrypted:1951,
      Data:`insert into "postgres".public.j_suppliers(sirket_adi,ad,soyad,adres,tel,email,vergi_dairesi,vergi_no,aciklama,yetkili,unvan) values('${data.sirket_adi}','${data.ad}','${data.soyad}','${data.adres}','${data.tel}','${data.email}','${data.vergi_dairesi}',${data.vergi_no},'${data.aciklama}','${data.yetkili}','${data.unvan}')`
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }
  deleteSuppliers(id:any){
    const body ={
      Token:this.getToken(),
      DataStoreId:"42268645312412746174",
      Operation:"delete",
      Encrypted:1951,
      Data:`delete from "postgres".public.j_suppliers where tedarikci_id='${id}'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body)
  }



  // ------------------------------------------------------------------------CUSTOMERS----------------------------------------------------------------------------------
  getCustomers(){
    const body={
      Token:this.getToken(),
      DataStoreId:'15714231125814142573',
      Operation:'read',
      Encrypted:1951,
      Data:'select * from "postgres".public.j_customers'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }
  insertCustomers(data:Customer){
    const body={
      Token:this.getToken(),
      DataStoreId:'15714231125814142573',
      Operation:'read',
      Encrypted:1951,
      Data:`insert into "postgres".public.j_customers(sirket_adi,ad,soyad,adres,tel,email,vergi_dairesi,vergi_no,aciklama,yetkili,unvan) values('${data.sirket_adi}','${data.ad}','${data.soyad}','${data.adres}','${data.tel}','${data.email}','${data.vergi_dairesi}',${data.vergi_no},'${data.aciklama}','${data.yetkili}','${data.unvan}')`
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  } 
  deleteCustomer(id:any){
    const body ={
      Token:this.getToken(),
      DataStoreId:"15714231125814142573",
      Operation:"delete",
      Encrypted:1951,
      Data:`delete from "postgres".public.j_customers where id='${id}'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body)
  }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  getProjects(){
    const body={
      Token:this.getToken(),
      DataStoreId:'87162637677132734427',
      Operation:'read',
      Encrypted:1951,
      Data:'select * from "postgres".public.j_pipeline'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }

  deleteProject(id:any){
    const body ={
      Token:this.getToken(),
      DataStoreId:"87162637677132734427",
      Operation:"delete",
      Encrypted:1951,
      Data:`delete from "postgres".public.j_pipeline where proje_id='${id}'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body)
  }
  
  getComboboxName(){
    const body={
      Token:this.getToken(),
      DataStoreId:'15714231125814142573',
      Operation:'read',
      Encrypted:1951,
      Data:'select ad,soyad from "postgres".public.j_customers'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }

  getItems(){
    const body={
      Token:this.getToken(),
      DataStoreId:'62723767246517453585',
      Operation:'read',
      Encrypted:1951,
      Data:'select * from "postgres".public.j_item'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }
  insertItem(data:Item){
    const body={
      Token:this.getToken(),
      DataStoreId:'62723767246517453585',
      Operation:'read',
      Encrypted:1951,
      Data:`insert into "postgres".public.j_item(item_adi,kategori,marka,model,miktar_birim,durum,maliyet,birim,tarih) values('${data.item_adi}','${data.kategori}','${data.marka}','${data.model}','${data.miktar_birim}','${data.durum}',${data.maliyet},'${data.birim}','${data.tarih}')`
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }

  deleteItem(id:any){
    const body ={
      Token:this.getToken(),
      DataStoreId:"62723767246517453585",
      Operation:"delete",
      Encrypted:1951,
      Data:`delete from "postgres".public.j_item where item_id='${id}'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body)
  }


  //daha calıstırılmadı
  getItemsForProject(){
    const body={
      Token:this.getToken(),
      DataStoreId:'62723767246517453585',
      Operation:'read',
      Encrypted:1951,
      Data:'select item_adi from "postgres".public.j_items'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }

  getLastProject(){
    const body={
      Token:this.getToken(),
      DataStoreId:'87162637677132734427',
      Operation:'read',
      Encrypted:1951,
      Data:'SELECT * FROM "postgres".public.j_pipeline ORDER BY proje_id DESC LIMIT 3 OFFSET 0'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }


  upsertProject(values: any, type: any) {
    const updateBody = {
      "Token": this.getToken(),
      "DataStoreId": "87162637677132734427",
      "Operation": "upsert",
      "Data": `Update j_pipeline ` +
        `Set proje_adi='${values.proje_adi}', firma_adi='${values.firma_adi}',must_yet_kisi='${values.must_yet_kisi}', durum='${values.durum}',proje_basla='${values.proje_basla}',proje_bitis='${values.proje_bitis}',maliyet='${values.maliyet}',is_kalemi='${values.is_kalemi}'` +
        `WHERE proje_id = ${values.proje_id}`
    }

    const insertBody = {
      "Token": this.getToken(),
      "DataStoreId": "87162637677132734427",
      "Operation": "upsert",
      "Data":`insert into "postgres".public.j_pipeline(firma_adi,must_yet_kisi,proje_adi,proje_basla,proje_bitis,durum,maliyet,is_kalemi) values('${values.firma_adi}','${values.must_yet_kisi}','${values.proje_adi}','${values.proje_basla}','${values.proje_bitis}','${values.durum}',${values.maliyet},'${values.is_kalemi}')`

    }

    return this.http.post(baseUrl + 'Applications/DataOps', type == 'insert' ? insertBody : updateBody).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}




