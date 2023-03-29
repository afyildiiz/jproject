import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {  NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

import { Pipeline } from 'src/app/pipeline';
import { TaskService } from 'src/app/services/task.service';
import { ProjeUpdateComponent } from '../proje-update/proje-update.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAdded:boolean=false

  recentComp!:string

  projects:Pipeline[]=[]
  projectForm!:FormGroup
  musteriCombobox:any=[]

  projectCount:number=0
  supplierCount:number=0
  customerCount:number=0
  itemCount:number=0


  recentComponents:string[]=[]

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
    proje_id: 0,
    is_kalemi:''
  }
  constructor(private modal:NgbModal,private fb:FormBuilder,private task:TaskService,private router:Router,private titleservice:Title) { 
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url!=='/home') {
    //     this.lastVisitedComp = event.url.split('/').pop()!.toUpperCase();
    //   }
    // });
  
  }

  ngOnInit(): void {
    this.recentComponents = this.task.getRecentlyViewedComponents();


    this.getProject();
    this.getCustomer();
    this.getSupplier();
    this.getItems();
    this.getComboboxNames();
    this.getlastproject();
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

  getRecentlyViewedComponents(): string[] {
    return this.task.getRecentlyViewedComponents();
  }

  // openUpdate(){
  //   this.modal.open(update,{size:'lg',centeredtrue})
  // }

  getProject(){
    this.task.getProjects().subscribe((res:any)=>{
      this.projectCount=res.length
    })
  }

  getSupplier(){
    this.task.getSuppliers().subscribe((res:any)=>{
      this.supplierCount=res.length
    })
  }
  getCustomer(){
    this.task.getCustomers().subscribe((res:any)=>{
      this.customerCount=res.length
    })
  }
  getItems(){
    this.task.getItems().subscribe((res:any)=>{
      this.itemCount=res.length
    })
  }

  getlastproject(){
    this.task.getLastProject().subscribe((res:any)=>{
      this.projects=res
    })
  }

  saveProject(){
    if (this.projectForm.valid){
      let item=Object.assign(this.projectForm.value);
      item.dateAdded = new Date();

      this.task.insertProject(item).subscribe((res:any)=>{
        console.log("Project",res.proje_adi,"at ", item.dateAdded)
        alert("Kaydedildi!")
        this.getProject()
        this.modal.dismissAll()
        this.isAdded=true
      })
    }else{
      alert("boslukları doldurun")
    }
  }

  deleteProject(id:any){
    if (confirm("Kaydı Silmek İstiyor musunuz?")){
      this.task.deleteProject(id).subscribe((res:any)=>{
        console.log(res);
        this.getProject()
      })
    }
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

  row:any
  edit(row: any) {
    const modalRef = this.modal.open(ProjeUpdateComponent,{ windowClass:'custom-modal'});
    modalRef.componentInstance.projects = row;
  }


  // formatCurrency_TaxableValue(event:any)
  // {
  //   var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
  //   this.tax = event.target.value;
  //   this.taxableValue = uy;
  // }
}
