import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/item';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {

  itemForm!:FormGroup
  data:Item={
    item_adi: '',
    kategori: '',
    marka: '',
    model: '',
    miktar_birim: 0,
    durum: '',
    maliyet: 0,
    birim: '',
    tarih: new Date(),
    item_id: 0
  }

  constructor(public modal:NgbModal,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.itemForm=this.fb.group({
      item_adi:[this.data.item_adi,Validators.required],
      kategori:[this.data.kategori,Validators.required],
      marka:[this.data.marka,Validators.required],
      model:[this.data.model,Validators.required],
      miktar_birim:[this.data.miktar_birim,Validators.required],
      durum:[this.data.durum,Validators.required],
      maliyet:[this.data.maliyet,Validators.required],
      birim:[this.data.birim,Validators.required],
      tarih:[this.data.tarih,Validators.required]
    })
  }

}
