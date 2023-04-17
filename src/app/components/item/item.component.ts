import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/item';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
import { ItemUpdateComponent } from '../item-update/item-update.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  component='hometable'
  musteri = 'AYKUT GUVEN';
  proje = 'XXXXXXX';
  
  items:Item[]=[]

  itemForm!:FormGroup
  constructor(public modal:NgbModal,private fb:FormBuilder,private task:TaskService) {}


  ngOnInit(): void {
    this.task.addRecentlyViewedComponent(this.constructor.name);

    
    this.getItem();


    this.itemForm=this.fb.group({
      item_adi:['',Validators.required],
      kategori:['',Validators.required],
      marka:['',Validators.required],
      model:['',Validators.required],
      miktar_birim:['',Validators.required],
      durum:['',Validators.required],
      maliyet:['',Validators.required],
      birim:['',Validators.required],
      tarih:['',Validators.required]
    })
  }
  openItem(item: any) {
    this.modal.open(item, { size: 'lg', centered: true });
  }
  closeItem() {
    this.modal.dismissAll();
  }

  getItem(){
    this.task.getItems().subscribe((res:any)=>{
      console.log(res)
      this.items=res;
    })
  }

  saveItem(){
    if (this.itemForm.valid){
      let item=Object.assign(this.itemForm.value);
      this.task.insertItem(item).subscribe((res:any)=>{
        console.log(res)
        alert("Kaydedildi!")
        this.getItem()
        this.modal.dismissAll()
      })
    }else{
      alert("boslukları doldurun")
    }

  }

  deleteItem(id:any){
    Swal.fire({
      icon: 'question',
      title: 'Kayıt Silinecek!',
      text: 'Bu item kaydını silmek istediğinize emin misiniz?',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      denyButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.task.deleteItem(id).subscribe(res => {
          if (res == 'Success')
            Swal.fire('Proje başarıyla silindi!', '', 'success')
          else if (result.dismiss===Swal.DismissReason.cancel)
        {
            Swal.fire('Bir Hata Oluştu!', '', 'success')
        }
        this.getItem()

        })
      }
    })
  }
  
  edit(){
    this.modal.open(ItemUpdateComponent,{size:'lg',centered:true})
  }
}
