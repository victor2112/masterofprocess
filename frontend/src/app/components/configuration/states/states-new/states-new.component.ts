import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-states-new',
  templateUrl: './states-new.component.html',
  styleUrls: ['./states-new.component.scss']
})
export class StatesNewComponent implements OnInit {

  form:FormGroup;
  processesLists: ProcessesItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      stateName: [''],
      processName: [''],
      initial:[''],
      final:['']
    });

    this.processesLists = []; 
    
   }

  ngOnInit(): void {

    this.backend.getProcesses().subscribe(x => {
          if (x.status === 1) {
            this.processesLists = x.data;
          }
        }
    );

    
    
  }

  Create() {
    if (this.form.controls['stateName'].value.length > 0
        && Number(this.form.controls['processName'].value) > 0
        && this.form.controls['initial'].value.length > 0
        && this.form.controls['final'].value.length > 0) {
        
        this.backend.insertState(this.form.controls['stateName'].value,
          Number(this.form.controls['processName'].value),
          this.form.controls['initial'].value,
          this.form.controls['final'].value).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/states/states-list');
          }
        }
      )

    } else {
      alert('Error, favor completar todos los campos');
    }
    
  }



  goTo(ruta: string) {
    this.router.navigateByUrl('/' + ruta);  
  }

}
