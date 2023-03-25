import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {
  
  projectCount:number=0
  customerCount:number=0
  supplierCount:number=0
  itemCount:number=0


  navToggled:boolean=false


  navlist: any[] = [
        { name: 'Müşteri', icon: 'plus-circle'},
        { name: 'Tedarikçi', icon: 'plus-circle'},
        { name: 'İş Kalemleri', icon: 'plus-circle'},
        { name: 'Projeler', icon: 'plus-circle'},
  ]

  constructor(private task:TaskService) { }

  ngOnInit(): void {
    this.getProjectCount();
    this.getCustomerCount();
    this.getSupplierCount();
    this.getItemCount();
  }

  getProjectCount(){
    this.task.getProjects().subscribe((res:any)=>{
      this.projectCount=res.length
    })
  }
  getCustomerCount(){
    this.task.getCustomers().subscribe((res:any)=>{
      this.customerCount=res.length
    })
  }
  getSupplierCount(){
    this.task.getSuppliers().subscribe((res:any)=>{
      this.supplierCount=res.length
    })
  }
  getItemCount(){
    this.task.getItems().subscribe((res:any)=>{
      this.itemCount=res.length
    })
  }



  toggleNav() {
    if (this.navToggled) {
      this.openBar();
      this.navToggled = false;
    } else {
      this.closeBar();
      this.navToggled = true;
    }
  }

  openBar(){
    const a=document.getElementById("mySidenav");
    const c=document.getElementById("main");
    const button=document.getElementById("closebut")
    if (a!==null){
      a.style.width="250px"
      if (c!==null)
      c.style.marginLeft="250px"
      if (button!==null)
      button.style.display="none"
    }
  }

  closeBar(){
    const b=document.getElementById("mySidenav");
    const d=document.getElementById("main");
    const but=document.getElementById("closebut");
    if (b!==null){
      b.style.width="0px"
      if (d!==null)
      d.style.marginLeft="0"
      if (but!==null)
      but.style.display="block"

    }
  }
}
