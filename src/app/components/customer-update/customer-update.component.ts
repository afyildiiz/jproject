import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/customer';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {


  customerForm!:FormGroup
  data:Customer={
    sirket_adi: '',
    ad: '',
    soyad: '',
    adres: '',
    tel: '',
    email: '',
    vergi_dairesi: '',
    vergi_no: 0,
    aciklama: '',
    yetkili: '',
    unvan: '',
    id: 0
  }
  constructor(public modal:NgbModal,public fb:FormBuilder) { }


  ngOnInit(): void {
    this.customerForm=this.fb.group({
      sirket_adi:[this.data.sirket_adi,Validators.required],
      ad:[this.data.ad,Validators.required],
      soyad:[this.data.soyad,Validators.required],
      adres:[this.data.adres,Validators.required],
      tel:[this.data.tel,Validators.required],
      email:[this.data.email,Validators.required],
      vergi_dairesi:[this.data.vergi_dairesi,Validators.required],
      vergi_no:[this.data.vergi_no,Validators.required],
      aciklama:[this.data.aciklama,Validators.required],
      yetkili:[this.data.yetkili,Validators.required],
      unvan:[this.data.unvan,Validators.required]
    })
  }

}
