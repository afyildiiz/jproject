import { Item } from "./item";

export interface Pipeline{
    // yetkili:string,
    firma_adi:string,
    // sehir:string,
    must_yet_kisi:string,
    proje_adi:string,
    proje_basla:Date,
    proje_bitis:Date,
    durum:string,
    maliyet:number,
    proje_id:number,
    item_id:number,
    
    aciklama:string,
    kar:number,
    toplam_item_fiyat:number,
}