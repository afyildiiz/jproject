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



  constructor(private task:TaskService,private fb:FormBuilder,private modal:NgbModal) { }

  ngOnInit(): void {

  }

}
