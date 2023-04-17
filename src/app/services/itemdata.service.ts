import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Itemdata } from '../itemdata';
import { baseUrl } from '../utils/baseUrl';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class ItemdataService {

  constructor(private task:TaskService,private http:HttpClient) { }


  getitemdata(){
    const body={
      Token:this.task.getToken(),
      DataStoreId:'34254418238117832164',
      Operation:'read',
      Encrypted:1951,
      Data:'select * from "postgres".public.j_itemdata'
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }

  insertitemdata(data:Itemdata){
    const body={
      Token:this.task.getToken(),
      DataStoreId:'34254418238117832164',
      Operation:'read',
      Encrypted:1951,
      Data:`insert into "postgres".public.j_itemdata(item_adi,item_adet_maliyet) values('${data.item_adi}',${data.item_adet},'${data.item_maliyet}')`
    }
    return this.http.post(baseUrl+'Applications/Dataops',body).pipe(map((response:any)=>{
      return response.message
    }))
  }
}
