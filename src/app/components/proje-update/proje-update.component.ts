import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipeline } from 'src/app/pipeline';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-proje-update',
  templateUrl: './proje-update.component.html',
  styleUrls: ['./proje-update.component.scss']
})
export class ProjeUpdateComponent implements OnInit {
  @Input() project!:any

  @Input() data!: Pipeline;
  projectForm!: FormGroup;
  updateForm!:FormGroup
  musteriCombobox:any=[]
  projects:Pipeline[]=[]
  constructor(private fb:FormBuilder,private task:TaskService,public modal:NgbModal) { }

  ngOnInit(): void {
        // this.updateForm=this.fb.group({
    //   // yetkili:[this.data.yetkili,Validators.required],
    //   firma_adi:[this.data.firma_adi,Validators.required],
    //   // sehir:[this.data.sehir,Validators.required],
    //   must_yet_kisi:[this.data.must_yet_kisi,Validators.required],
    //   proje_adi:[this.data.proje_adi,Validators.required],
    //   proje_basla:[this.data.proje_basla,Validators.required],
    //   proje_bitis:[this.data.proje_bitis,Validators.required],
    //   // aciklama:[this.data.aciklama,Validators.required],
    //   durum:[this.data.durum,Validators.required],
    //   maliyet:[this.data.maliyet,Validators.required]
    // })
    // this.getComboboxNames();
  }
  get f(){
    return this.updateForm.controls
  }

  close(){
    this.modal.dismissAll()
  }


  // updateProject() {
  //   if (this.projectForm.valid) {
  //     let item = Object.assign({ proje_id: this.data.proje_id }, this.projectForm.value);
  //     this.task.updateProject(item).subscribe((res: any) => {
  //       console.log(res);
  //       alert("Güncellendi!");
  //     });
  //   } else {
  //     alert("Lütfen tüm alanları doldurun.");
  //   }
  // }
}





// <body>
  
//     <div class="mt-2 p-3 ">
//       <div class="row" style="justify-content: space-between;">
    
//         <div class="col-lg-8">
//           <div class="row">
//             <div class="d-flex col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='bar-chart'></i-feather> -->
//                 Proje Adı:
//               </span>
//               <span class="text-sm">
//                 <!-- {{selectedTask?.statustext}} -->
//               </span>
//             </div>
//             <div class="d-flex  col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='type'></i-feather> -->
//                 Firma Adı:
//               </span>
//               <span class="text-sm">
//                 <!-- {{selectedTask?.rtypetext}} -->
//               </span>
//             </div>
//             <div class="d-flex mt-3 col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='alert-octagon'></i-feather> -->
//                 Müşteri Yetkili Kişi:
//               </span>
//               <span class="text-sm">
//                 <!-- {{selectedTask?.prioritytext}} -->
//               </span>
//             </div>
//             <div class="d-flex mt-3 col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='user-plus'></i-feather> -->
//                 Proje Başlama Tarihi:
//               </span>
//               <span class="text-sm">
//                 <!-- {{getUser(selectedTask?.assignedby)}} -->
//               </span>
//             </div>
//             <div class="d-flex mt-3 col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='user-check'></i-feather> -->
//                 Proje Bitiş Tarihi:
//               </span>
//               <span class="text-sm">
//                 <!-- {{getUser(selectedTask?.assignee)}} -->
//               </span>
//             </div>
//             <div class="d-flex mt-3 col-lg-5">
//               <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//                 <!-- <i-feather class="mr-1 small" name='calendar'></i-feather> -->
//                 Statü:
//               </span>
//               <!-- <span class="text-sm" *ngIf="selectedTask!==undefined&& selectedTask?.duedate!==undefined">
//                 {{selectedTask.duedate.split('T')[0]}}
//               </span> -->
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="mt-3">
//         <span class="text-sm" style="font-weight: bold;flex-basis: 40%;">
//           <!-- <i-feather class="mr-1 small" name='user'></i-feather> -->
//           Proje Fiyatı:
//         </span>
//         <!-- <span *ngFor="let item of supporter">
//           <img [src]="getAvatar(item)"
//             style="width: 30px;height: 30px;border-radius: 20px;margin-right: 5px;"
//             ngbPopover="{{getUser(item)}}" triggers="mouseenter:mouseleave"
//             />
//         </span> -->
//       </div>
//     </div>
//     <hr>
  
  
  
  
//       <div class="container">
      
//           <div class="ml-3 mr-3 ">
//               <div class="card-header" style="margin-top: 2rem">
//                 <h4>Update Project</h4>
//                 <form [formGroup]="updateForm" class="example-form">
//                   <div class="row">
//                     <div class="mb-3 col-lg-6">
//                       <label for="exampleInputEmail1" class="form-label" >Firma Adı</label>
//                       <input type="text" formControlName="firma_adi" class="form-control" >
//                     </div>
//                     <div class="mb-3 col-lg-6">
//                       <label for="exampleFormControlTextarea1"  class="form-label">Proje</label>
//                       <input type="text" formControlName="proje_adi" class="form-control" >
//                     </div>
            
//                     <div class="mb-3 col-lg-6">
//                       <label for="exampleFormControlTextarea1" class="form-label">Müşteri Yetkili Kişi</label>
//                       <select formControlName="must_yet_kisi"  class="form-select form-control">
//                           <option *ngFor="let item of musteriCombobox" value="musteri" [value]="item.ad"> {{item.ad+" "+item.soyad}} </option>
//                       </select>
//                     </div>
//                     <div class="mb-3 col-lg-6">
//                       <label for="exampleInputEmail1" class="form-label">Proje Fiyat</label>
//                       <input type="text" formControlName="maliyet"  class="form-control" >
                      
//                     </div>
            
//                     <div class="mb-3 col-lg-6">
//                       <label for="exampleFormControlTextarea1" class="form-label">Statü</label>
//                       <select formControlName="durum"  class="form-select form-control" name="" id="">
//                           <option value="Yeni" >Yeni</option>
//                           <option value="Çalışılıyor" >Çalışılıyor</option>
//                           <option value="Bekliyor" >Bekliyor</option>
//                           <option value="Müşteri Bekleniyor" >Müşteri Bekleniyor</option>
//                           <option value="Tamamlandı" >Tamamlandı</option>
//                         </select>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="form-group col-lg-6">
//                       <label for="exampleFormControlTextarea1" class="form-label">Proje Başla</label>
//                       <div class="input-group">
//                         <input formControlName="proje_basla" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker
//                           #sd="ngbDatepicker">
//                         <div class="input-group-append">
//                           <button class="btn btn-outline-secondary calendar" (click)="sd.toggle()" type="button">
//                               <i class="fa-solid fa-calendar-days"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="form-group col-lg-6">
//                       <label for="exampleFormControlTextarea1" class="form-label">Proje Bitiş</label>
//                       <div class="input-group">
//                         <input formControlName="proje_bitis" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker
//                           #dd="ngbDatepicker">
//                         <div class="input-group-append">
//                           <button class="btn btn-outline-secondary calendar" (click)="dd.toggle()" type="button">
//                               <i class="fa-solid fa-calendar-days"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                   <button style="margin:24px;position: absolute;left: 50%;" (click)="updateProject()" type="submit" class="btn btn-primary">Update</button>
  
//                   </div>
          
          
//                 </form>
            
//               </div>
//             </div>
//           </div>
//   </body>  