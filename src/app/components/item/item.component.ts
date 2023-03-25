import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  component='hometable'
  musteri = 'AYKUT GUVEN';
  proje = 'XXXXXXX';
  // items:Item[]=[]
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  items:Item[]=[]

  itemForm!:FormGroup
  constructor(private modal:NgbModal,private fb:FormBuilder,private task:TaskService) {}


  ngOnInit(): void {
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
      })
    }else{
      alert("boslukları doldurun")
    }
  }

}
