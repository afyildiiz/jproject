import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Item } from 'src/app/item';
import { Pipeline } from 'src/app/pipeline';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-saveditems',
  templateUrl: './project-saveditems.component.html',
  styleUrls: ['./project-saveditems.component.scss']
})
export class ProjectSaveditemsComponent implements OnInit {

  projects:Pipeline[]=[]
  projectForm!:FormGroup
  itemforproject:Pipeline[]=[]
  musteriCombobox:any=[]
  
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
  items:Item[]=[]

  // dropdownSettings:IDropdownSettings={};

  constructor(private task:TaskService,private fb:FormBuilder,private modal:NgbModal) { }

  ngOnInit(): void {

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField:'item_id',
    //   textField: 'item_adi',
    //   selectAllText: 'Hepsini Seç',
    //   unSelectAllText: 'Seçimleri Temizle',
    //   itemsShowLimit: 3,
    //   // allowSearchFilter: true,
    // };
    
    

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
          // is_kalemi: new FormControl(this.selectedProject.is_kalemi, Validators.required),
        });
  }
  get f(){
    return this.projectForm.controls
  }
  close(){
    this.modal.dismissAll()
  }

  getProject(){
    this.task.getProjects().subscribe((res:any)=>{
      console.log(res)
      this.projects=res;
      
    })
  }

  getComboboxNames(){
    this.task.getComboboxName().subscribe((res:any)=>{
      this.musteriCombobox=res
      console.log(res)
    })
  }

  getSelectedItems(){
    const selectedItemss = this.projectForm.get('is_kalemi')?.value as Item[];
    if (Array.isArray(selectedItemss)) {
      selectedItemss.forEach(item => console.log(item));
    }
  }


  upsertProject() {
    let data = Object.assign(this.selectedProject, this.projectForm.value)
    // this.data.is_kalemi = this.selectedUser?.item_id.toString()
    let type = data.proje_id == '' ? 'insert' : 'update'
    data.is_kalemi = this.getSelectedItems() // is_kalemi alanındaki veriyi stringe dönüştürür
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
}
