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
    item_ids:number,
    // selected:boolean,
    
    aciklama:string,
    kar:number,
    toplam_item_fiyat:number,
    finans_tip:string,
    finans_tarih:Date,
    finans_miktar:number,
    finans_birim:string,
    finans_aciklama:string
}