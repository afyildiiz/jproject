import { Component, EventEmitter, Input, OnInit, Output, Pipe, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Customer } from 'src/app/customer';
import { Item } from 'src/app/item';
import { Itemdata } from 'src/app/itemdata';
import { Pipeline } from 'src/app/pipeline';
import { ItemdataService } from 'src/app/services/itemdata.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild ('closebutton') closebutton:any;
  selectedItem: Item[] = [];
  itemm!:any[]

	placement = 'bottom';

zero!:number

miktar:number=0


itemdataform!:FormGroup

searchTerm=""
searchprojeStok=""
projects:Pipeline[]=[]
projectForm!:FormGroup
itemforproject:Pipeline[]=[]
musteriCombobox:any=[]

checked!:boolean

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
  // item_ids: 0,
  aciklama: '',
  kar: 0,
  toplam_item_fiyat: 0,
  item_ids: 0,
  finans_tip: '',
  finans_tarih: new Date,
  finans_miktar: 0,
  finans_birim: '',
  finans_aciklama: ''
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
  item_ids: 0,
  aciklama: '',
  kar: 0,
  toplam_item_fiyat: 0,
  finans_tip: '',
  finans_tarih: new Date,
  finans_miktar: 0,
  finans_birim: '',
  finans_aciklama: ''
}
items: Item[]=[]
// eklenenEleman = this.selectedProject.item_ids;


itemselectedform!:FormGroup

public modalRef!: NgbModalRef;
private activemodal!:NgbActiveModal
// selectedItem: Item = this.items.find(x => x.item_id.toString() == this.data.is_kalemi)!
constructor(private modal:NgbModal,private fb:FormBuilder,private task:TaskService,private itemdata:ItemdataService) { 

  this.items.forEach((item, i) => {
    this.projectForm.addControl('item_ids' + i, new FormControl(item.item_id));
  });


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
        this.getfirmaadi()
        this.getProject();
        // this.getComboboxNames();
        this.projectForm = this.fb.group({
          firma_adi: new FormControl(this.selectedProject.firma_adi, Validators.required),
          must_yet_kisi: new FormControl(this.selectedProject.must_yet_kisi, Validators.required),
          proje_adi: new FormControl(this.selectedProject.proje_adi, Validators.required),
          proje_basla: new FormControl(this.selectedProject.proje_basla, Validators.required),
          proje_bitis: new FormControl(this.selectedProject.proje_bitis),
          durum: new FormControl(this.selectedProject.durum, Validators.required),
          maliyet: new FormControl(this.selectedProject.maliyet, Validators.required),
          aciklama: new FormControl(this.selectedProject.aciklama, Validators.required),
          toplam_item_fiyat: new FormControl(this.selectedProject.toplam_item_fiyat, Validators.required),
          kar: new FormControl(this.selectedProject.kar, Validators.required),
          // item_ids: this.fb.array([]) ,// burada, seçilen item'ların listesini tutacak bir FormControl ekledik
          finans_tip: new FormControl(this.selectedProject.finans_tip, Validators.required),
          finans_tarih: new FormControl(this.selectedProject.finans_tarih, Validators.required),
          finans_miktar: new FormControl(this.selectedProject.finans_miktar, Validators.required),
          finans_birim: new FormControl(this.selectedProject.finans_birim, Validators.required),
          finans_aciklama: new FormControl(this.selectedProject.finans_aciklama, Validators.required),
        });

        // finans_tip
        // finans_tarih
        // finans_miktar
        // finans_birim
        // finans_aciklama
        // this.itemdataform=this.fb.group({
        //   item_adi: new FormControl(this.selecteditemdata.item_adi, Validators.required),
        //   item_adet: new FormControl(this.selecteditemdata.item_adet, Validators.required),
        //   item_maliyet: new FormControl(this.selecteditemdata.item_maliyet, Validators.required),

        // })

        this.projectForm.get('firma_adi')?.valueChanges
        .pipe(
          distinctUntilChanged(), // Sadece yeni değerler için çalışır
          debounceTime(300), // 300 milisaniye bekle
          switchMap(firma_adi => this.task.getComboboxName(firma_adi)) // Filtrele ve müşterileri getir
        )
        .subscribe((customers: Customer[]) => {
          this.musteriCombobox = customers;
        });
    
      
  }
  get f(){
    return this.projectForm.controls
  }

  closeModal() {
    this.modal.dismissAll()
    this.addeditems=[]
  }

  firmalar:Customer[]=[]
  getfirmaadi(){
    this.task.getFirmaAdiForProj().subscribe(res=>{
      this.firmalar=res
      console.log(res)
    })
  }

  selectedItems1:Item[]=[]

  onCheckboxChange(event:any, index:any) {
    const formArray: FormArray = this.projectForm.get('item_ids') as FormArray;
    if (event.target.checked) {
      this.selectedItem.push(this.items[index]);
      formArray.push(new FormControl(event.target.value));
    } else {
      this.uncheck(this.items[index]);  
      formArray.removeAt(index);
    }
    
  }
  

  

  uncheck(item:any){
    const index = this.selectedItem.indexOf(item);
    if (index > -1) {
      this.selectedItem.splice(index, 1);
    }
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
  selectedFinance:Pipeline[]=[]

  // onRowClick(item: any): void {
  //   this.selectedItems = this.projects.filter(project => project.is_kalemi === item && this.projects.filter((p) => p.proje_id.toString() === `${item}-${project.proje_id}`)
  //   ) 
  // }
  // onRowClick(item: any): void {
  //   this.selectedItems = this.projects.filter(project => project.proje_id === item.proje_id);
  // }

  openSavedModal(savedItems:any,item:any){
        this.selectedItems = this.projects.filter(project => project.item_ids === item.proje_id);
        // && this.projects.filter((p) => p.proje_id.toString() === `${item}-${project.proje_id}`)
    // ) 
    // this.modal.open(savedItems ,{ size: 'lg' ,centered:true});
    this.selectedFinance=this.projects.filter(project => project.proje_id === item.proje_id);
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
      // this.projectForm.patchValue({ maliyet: this.selectedProject.item_id })
      // this.projectForm.patchValue({ is_kalemi: this.selectedProject.is_kalemi })
    }
    this.modal.open(content, { windowClass:"custom-modal" }).result.then((result) => { }
    ).catch(() => { });
  }

  getSelectedItems() {
    const selectedItems = this.items.filter(item => item.selected)
    if (selectedItems.length === 0) {
      return "";
    }
    return selectedItems.map(item => item.item_id).join(',');
  }
  
// //   Kurum adını tutan değişken
// // selectedKurum: string;

// // Combobox'ta gösterilecek müşterileri tutan dizi
// // musteriCombobox: Array<{ ad: string; soyad: string }> = [];

// Kurum adı değiştiğinde tetiklenecek fonksiyon
// onKurumAdiChanged() {
//   // Seçilen kurum adı varsa
//   if (this.selectedKurum) {
//     // Kurum id'sini veritabanından sorgulayıp elde edin
//     const kurumId = this.kurumlar.find(k => k.ad === this.selectedKurum)?.id;
//     if (kurumId) {
//       // Kuruma ait müşterileri sorgulayın
//       const musteriListesi = this.musteriler.filter(m => m.kurum_id === kurumId);
//       // Combobox'ta gösterilecek müşteri listesini güncelleyin
//       this.musteriCombobox = musteriListesi.map(m => ({ ad: m.ad, soyad: m.soyad }));
//     }
//   } else {
//     // Kurum adı seçilmediyse müşteri listesini boşaltın
//     this.musteriCombobox = [];
//   }
// }




addeditems:Pipeline[]=[]

  upsertProject(): void {
    let data = Object.assign(this.selectedProject, this.projectForm.value)
    let type = data.proje_id == '' ? 'insert' : 'update'
    // data.item_ids = this.selectedItems1
    const newItem = this.projectForm.value;
    this.addeditems.push(newItem); // Yeni veri addedItems dizisine eklenir
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
            // this.modal.dismissAll()

            this.getProject()
            this.projectForm.reset()
            this.selectedItems1 = []
            this.items.forEach(item => {
              item.selected = false
            });
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
  

  // getComboboxNames(){
  //   this.task.getComboboxName().subscribe((res:any)=>{
  //     this.musteriCombobox=res
  //     console.log(res)
  //   })
  // }

  selectedTask:any

  close(){
    this.modal.dismissAll()
  }

  openprojestok(projestok:any){
    this.modal.open(projestok,{windowClass:'modalcustom'})
  }

  // nextTab(){
  //   this.navRef.select(this.navRef);
  // }

}
