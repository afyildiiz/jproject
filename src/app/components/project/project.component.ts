import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  @Output() lengthEvent:any=new EventEmitter()
  @Output() sendLength=new EventEmitter<number>()


projects:Pipeline[]=[]
projectForm!:FormGroup
musteriCombobox:any=[]

data:Pipeline={
  // yetkili: '',
  firma_adi: '',
  // sehir: '',
  must_yet_kisi: '',
  proje_adi: '',
  proje_basla: new Date(),
  proje_bitis: new Date(),
  // aciklama: '',
  durum: '',
  maliyet: 0,
  proje_id: 0
}
constructor(private modal:NgbModal,private fb:FormBuilder,private task:TaskService) { }


  ngOnInit(): void {
        // this.getLength()
        this.getProject();
        this.getComboboxNames();
        this.projectForm=this.fb.group({
          firma_adi:['',Validators.required],
          must_yet_kisi:['',Validators.required],
          proje_adi:['',Validators.required],
          proje_basla:['',Validators.required],
          proje_bitis:['',Validators.required],
          durum:['',Validators.required],
          maliyet:['',Validators.required]
          // aciklama:['',Validators.required],
          // sehir:['',Validators.required],
          // yetkili:['',Validators.required],
    
        })
  }
  get f(){
    return this.projectForm.controls
  }
  openProject(savedItems:any){
    this.modal.open(savedItems,{size:'lg',centered:true})
  }
  closeItem(){
    this.modal.dismissAll()
  }


  getProject(){
    this.task.getProjects().subscribe((res:any)=>{
      console.log(res)
      this.projects=res;
      return this.sendLength.emit(this.projects.length)
      
    })
  }

  saveProject(){
    if (this.projectForm.valid){
      let item=Object.assign(this.projectForm.value);
      item.dateAdded = new Date();

      this.task.insertProject(item).subscribe((res:any)=>{
        console.log("Project",res.value,"at ", item.dateAdded)
        alert("Kaydedildi!")
        this.getProject()
        this.modal.dismissAll()
      })
    }else{
      alert("boslukları doldurun")
    }
  }

  // deleteProject(id:any){
  //   if (confirm("Kaydı Silmek İstiyor musunuz?")){
  //     this.task.deleteProject(id).subscribe((res:any)=>{
  //       console.log(res);
  //       this.getProject()
  //     })
  //   }
  // }
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


  edit(project: any) {
    const modalRef = this.modal.open(ProjeUpdateComponent,{ windowClass:'custom-modal'});
    modalRef.componentInstance.projects = project;
  }


  // formatCurrency_TaxableValue(event:any)
  // {
  //   var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
  //   this.tax = event.target.value;
  //   this.taxableValue = uy;
  // }
}
