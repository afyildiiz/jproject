import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipeline } from 'src/app/pipeline';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2'
import { ProjeUpdateComponent } from '../proje-update/proje-update.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  // @Input() project!:Pipeline
  // selectedProject!:Pipeline

  @Output() lengthEvent:any=new EventEmitter()
  @Output() sendLength=new EventEmitter<number>()

	placement = 'bottom';

projects:Pipeline[]=[]
projectForm!:FormGroup

musteriCombobox:any=[]

iskalemleri:any[]=[]


selectedProject:Pipeline={
  firma_adi: '',
  must_yet_kisi: '',
  proje_adi: '',
  proje_basla: new Date(),
  proje_bitis: new Date(),
  durum: '',
  maliyet: 0,
  proje_id: 0,
  is_kalemi:''
}
constructor(public modal:NgbModal,private fb:FormBuilder,private task:TaskService) { }


  ngOnInit(): void {
    this.task.addRecentlyViewedComponent(this.constructor.name);


        // this.getLength()
        this.getProject();
        this.getComboboxNames();
        // this.projectForm=this.fb.group({
        //   firma_adi:['',Validators.required],
        //   must_yet_kisi:['',Validators.required],
        //   proje_adi:['',Validators.required],
        //   proje_basla:['',Validators.required],
        //   proje_bitis:['',Validators.required],
        //   durum:['',Validators.required],
        //   maliyet:['',Validators.required],
        //   is_kalemi:['',Validators.required]
        //   // aciklama:['',Validators.required],
        //   // sehir:['',Validators.required],
        //   // yetkili:['',Validators.required],
    
        // })

        this.projectForm = this.fb.group({
          firma_adi: new FormControl(this.selectedProject.firma_adi, Validators.required),
          must_yet_kisi: new FormControl(this.selectedProject.must_yet_kisi, Validators.required),
          proje_adi: new FormControl(this.selectedProject.proje_adi, Validators.required),
          proje_basla: new FormControl(this.selectedProject.proje_basla, Validators.required),
          proje_bitis: new FormControl(this.selectedProject.proje_bitis),
          durum: new FormControl(this.selectedProject.durum, Validators.required),
          maliyet: new FormControl(this.selectedProject.maliyet, Validators.required),
          is_kalemi: new FormControl(this.selectedProject.is_kalemi, Validators.required),
          // aciklama: new FormControl(this.selectedProject.customer, Validators.required),
          // sehir: new FormControl(this.selectedProject.customer, Validators.required),
          // yetkili: new FormControl(this.selectedProject.customer, Validators.required),

    
    
        });
  }
  get f(){
    return this.projectForm.controls
  }

  getProject(){
    this.task.getItems().subscribe(res =>{
      console.log(res)
       this.iskalemleri = res
      })
    this.task.getProjects().subscribe((res:any)=>{
      console.log(res)
      this.projects=res;
      
    })
  }


  openProject(savedItems:any){
    this.modal.open(savedItems,{size:'lg',centered:true})
  }

  opens(content: any, item: any, type: string) {

    if (type == 'insert')
      this.projectForm.reset()
    else {
      this.selectedProject = item
      this.projectForm.patchValue({ firma_adi: this.selectedProject.firma_adi })
      this.projectForm.patchValue({ must_yet_kisi: this.selectedProject.must_yet_kisi })
      this.projectForm.patchValue({ proje_adi: this.selectedProject.proje_adi })
      this.projectForm.patchValue({ proje_basla: this.selectedProject.proje_basla })
      this.projectForm.patchValue({ proje_bitis: this.selectedProject.proje_bitis })
      this.projectForm.patchValue({ durum: this.selectedProject.durum })
      this.projectForm.patchValue({ maliyet: this.selectedProject.maliyet })
      this.projectForm.patchValue({ is_kalemi: this.selectedProject.is_kalemi })
    }
    this.modal.open(content, { size:'lg',centered:true }).result.then((result) => { }
    ).catch(() => { });
  }

  upsertProject() {
    let data = Object.assign(this.selectedProject, this.projectForm.value)

    let type = data.proje_id == '' ? 'insert' : 'update'
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

  open(savedItems: any) {
    this.modal.open(savedItems, { size:'lg',centered:true });
  }

  openDetail(detail:any){
    this.modal.open(detail,{ size:'lg',centered:true })
  }

}
