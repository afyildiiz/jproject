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
  constructor(private fb:FormBuilder,private task:TaskService,private modal:NgbModal) { }

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
    this.getComboboxNames();
  }
  get f(){
    return this.updateForm.controls
  }

  close(){
    this.modal.dismissAll()
  }
  getComboboxNames(){
    this.task.getComboboxName().subscribe((res:any)=>{
      this.musteriCombobox=res
      console.log(res)
    })
  }

  updateProject() {
    if (this.projectForm.valid) {
      let item = Object.assign({ proje_id: this.data.proje_id }, this.projectForm.value);
      this.task.updateProject(item).subscribe((res: any) => {
        console.log(res);
        alert("Güncellendi!");
      });
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  }
}
