import { Component, EventEmitter, Input, OnInit, Output, Pipe, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Item } from 'src/app/item';
import { Itemdata } from 'src/app/itemdata';
import { Pipeline } from 'src/app/pipeline';
import { ItemdataService } from 'src/app/services/itemdata.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2'
import { ProjeUpdateComponent } from '../proje-update/proje-update.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  
  selectedItem: Item[] = [];
  itemm!:any[]

  // @Output() lengthEvent:any=new EventEmitter()
  // @Output() sendLength=new EventEmitter<number>()

	placement = 'bottom';

zero!:number


itemdataform!:FormGroup

searchTerm=""
searchprojeStok=""
projects:Pipeline[]=[]
projectForm!:FormGroup
itemforproject:Pipeline[]=[]
musteriCombobox:any=[]



dropdownSettings:IDropdownSettings={};

itdata:Itemdata[]=[]
selecteditemdata:Itemdata={
  item_adi: '',
  item_adet: 0,
  item_maliyet: ''
}

selectedProject:Pipeline={
  firma_adi: '',
  must_yet_kisi: '',
  proje_adi: '',
  proje_basla: new Date(),
  proje_bitis: new Date(),
  durum: '',
  maliyet: 0,
  proje_id: 0,
  item_id: 0,
  aciklama: '',
  kar: 0,
  toplam_item_fiyat: 0
}
data:Pipeline={
  firma_adi: '',
  must_yet_kisi: '',
  proje_adi: '',
  proje_basla: new Date(),
  proje_bitis: new Date(),
  durum: '',
  maliyet: 0,
  proje_id: 0,
  item_id: 0,
  aciklama: '',
  kar: 0,
  toplam_item_fiyat: 0
}
items: Item[]=[]


itemselectedform!:FormGroup

public modalRef!: NgbModalRef;

// selectedItem: Item = this.items.find(x => x.item_id.toString() == this.data.is_kalemi)!
constructor(private modal:NgbModal,private fb:FormBuilder,private task:TaskService,private itemdata:ItemdataService) { 


}


  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField:'item_id',
      textField: 'item_adi',
      selectAllText: 'Hepsini Seç',
      unSelectAllText: 'Seçimleri Temizle',
      itemsShowLimit: 3,
      // allowSearchFilter: true,
    };
    
    

    this.task.addRecentlyViewedComponent(this.constructor.name);

        this.getProject();
        this.getComboboxNames();
        this.projectForm = this.fb.group({
          firma_adi: new FormControl(this.selectedProject.firma_adi, Validators.required),
          must_yet_kisi: new FormControl(this.selectedProject.must_yet_kisi, Validators.required),
          proje_adi: new FormControl(this.selectedProject.proje_adi, Validators.required),
          proje_basla: new FormControl(this.selectedProject.proje_basla, Validators.required),
          proje_bitis: new FormControl(this.selectedProject.proje_bitis),
          durum: new FormControl(this.selectedProject.durum, Validators.required),
          maliyet: new FormControl(this.selectedProject.maliyet, Validators.required),
          // item_id: new FormControl(this.selectedProject.item_id, Validators.required),
          aciklama: new FormControl(this.selectedProject.aciklama, Validators.required),
          toplam_item_fiyat: new FormControl(this.selectedProject.toplam_item_fiyat, Validators.required),
          kar: new FormControl(this.selectedProject.kar, Validators.required),
        });
        this.itemdataform=this.fb.group({
          item_adi: new FormControl(this.selecteditemdata.item_adi, Validators.required),
          item_adet: new FormControl(this.selecteditemdata.item_adet, Validators.required),
          item_maliyet: new FormControl(this.selecteditemdata.item_maliyet, Validators.required),

        })


        this.itemselectedform=this.fb.group({
          selected:['',Validators.required]
        })
  }
  get f(){
    return this.projectForm.controls
  }

  closeModal() {
    this.modalRef.dismiss();
  }

  onItemSelect(item: any) {
    if (item.selected) {
      this.selectedItem.push(item);
      console.log("eklendi",this.selectedItem)
    } else {
      const index = this.selectedItem.indexOf(item);
      if (index > -1) {
        this.selectedItem.splice(index, 1);
      }
    }
  }

  uncheck(item:any){
    const index = this.selectedItem.indexOf(item);
    if (index > -1) {
      this.selectedItem.splice(index, 1);
      item.selected=false
    }
  }
  

  saveitemdata(){
    if (this.itemdataform.valid){
    let supp=Object.assign(this.itemdataform.value);
    this.itemdata.insertitemdata(supp).subscribe((res:any)=>{
      alert("kaydedildi")
      this.getitemdata()
    })
  }else{
    alert("boşlukları doldurunuz!")
  }
  this.modal.dismissAll()
  }

  getitemdata(){
    this.itemdata.getitemdata().subscribe(res =>{
      console.log(res)
       this.itdata = res
      })
  }
  openitemdata(itemekle:any){
    this.modal.open(itemekle,{size:'lg',centered:true})
  }


  getProject(){
    this.task.getItems().subscribe(res =>{
      console.log(res)
       this.items=res

      })
    this.task.getProjects().subscribe((res:any)=>{
      console.log(res)
      this.projects=res;
      
    })
  }

  ///

  selectedItems:Pipeline[]=[]

  // onRowClick(item: any): void {
  //   this.selectedItems = this.projects.filter(project => project.is_kalemi === item && this.projects.filter((p) => p.proje_id.toString() === `${item}-${project.proje_id}`)
  //   ) 
  // }
  // onRowClick(item: any): void {
  //   this.selectedItems = this.projects.filter(project => project.proje_id === item.proje_id);
  // }

  openSavedModal(savedItems:any){
    this.modal.open(savedItems ,{ size: 'lg' ,centered:true});

  }
  
  opens(content: any, item: any, type: string) {

    if (type == 'insert')
      this.projectForm.reset();
    else {
      this.selectedProject = item
      this.projectForm.patchValue({ firma_adi: this.selectedProject.firma_adi })
      this.projectForm.patchValue({ must_yet_kisi: this.selectedProject.must_yet_kisi })
      this.projectForm.patchValue({ proje_adi: this.selectedProject.proje_adi })
      this.projectForm.patchValue({ proje_basla: this.selectedProject.proje_basla })
      this.projectForm.patchValue({ proje_bitis: this.selectedProject.proje_bitis })
      this.projectForm.patchValue({ durum: this.selectedProject.durum })
      this.projectForm.patchValue({ maliyet: this.selectedProject.maliyet })
      // this.projectForm.patchValue({ is_kalemi: this.selectedProject.is_kalemi })
    }
    this.modal.open(content, { windowClass:"custom-modal" }).result.then((result) => { }
    ).catch(() => { });
  }

  // getSelectedItems(){
  //   const selectedItemss = this.projectForm.get('is_kalemi')?.value as Item[];
  //   if (Array.isArray(selectedItemss)) {
  //     selectedItemss.forEach(item => console.log(item));
  //   }
  // }

  upsertProject() {
    let data = Object.assign(this.selectedProject, this.projectForm.value)
    // this.data.is_kalemi = this.selectedUser?.item_id.toString()
    let type = data.proje_id == '' ? 'insert' : 'update'
    // data.is_kalemi = this.getSelectedItems() // is_kalemi alanındaki veriyi stringe dönüştürür
    if (this.projectForm && !this.projectForm.valid) {
      Swal.fire('Lütfen Tüm Alanları Doldurunuz!', '', 'info')

    } else {
      Swal.fire({
        icon: 'question',
        title: type == 'insert' ? `Kayıt Eklenecek!` : 'Kayıt Güncellenecek!',
        text: type == 'insert' ? `Bu kaydı eklemek itediğinize emin misiniz?` : 'Bu projeyi güncellemek istediğinize emin misiniz?',
        showCancelButton: true,
        confirmButtonText: 'Evet',
        denyButtonText: 'Vazgeç',
      }).then((result) => {
        if (result.isConfirmed) {
            this.task.upsertProject(data, type).subscribe(res => {
              if (res == 'Success') {
                if (type == 'insert') {
                  this.task.getLastProject().subscribe(res => {
                  })
                }
                Swal.fire(type == 'insert' ? `Proje başarıyla eklendi!` : 'Proje başarıyla güncellendi!', '', 'success')

              } else
                Swal.fire('Bir Hata Oluştu!', '', 'error')
            })
            this.modal.dismissAll()
            this.getProject()
        }


      })
    }
  }


  deleteProjects(id:any){
    Swal.fire({
      icon: 'question',
      title: 'Kayıt Silinecek!',
      text: 'Bu proje kaydını silmek istediğinize emin misiniz?',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      denyButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.task.deleteProject(id).subscribe(res => {
          if (res == 'Success')
            Swal.fire('Proje başarıyla silindi!', '', 'success')
          else if (result.dismiss===Swal.DismissReason.cancel)
        {
            Swal.fire('Bir Hata Oluştu!', '', 'success')
        }
        this.getProject()

        })
      }
    })
  }
  

  getComboboxNames(){
    this.task.getComboboxName().subscribe((res:any)=>{
      this.musteriCombobox=res
      console.log(res)
    })
  }

  selectedTask:any

  close(){
    this.modal.dismissAll()
  }

  openprojestok(projestok:any){
    this.modal.open(projestok,{size:'lg',centered:true})
  }


}
