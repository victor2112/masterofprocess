import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { StatesItem } from 'src/app/models/StatesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-transitions-new',
  templateUrl: './transitions-new.component.html',
  styleUrls: ['./transitions-new.component.scss']
})
export class TransitionsNewComponent implements OnInit {

  form:FormGroup;
  processes: ProcessesItem[];
  states: StatesItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      processName: [''],
      origin: [''],
      destiny:['']
    });

    this.processes = []; 
    this.states = []; 
    
   }

  ngOnInit(): void {

    this.backend.getProcesses().subscribe(x => {
          if (x.status === 1) {
            this.processes = x.data;
          }
        }
    );

    this.backend.getStates().subscribe(x => {
          if (x.status === 1) {
            this.states = x.data;
          }
        }
    );

    
    
  }

  Create() {
    
    if (Number(this.form.controls['processName'].value) > 0
        && Number(this.form.controls['origin'].value) > 0
        && Number(this.form.controls['destiny'].value) > 0) {
        
        this.backend.insertTransition(Number(this.form.controls['origin'].value),
          Number(this.form.controls['destiny'].value),
          Number(this.form.controls['processName'].value)).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/transitions/transitions-list');
          } else {
            alert(x.message);
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

  filterStatesOrigin(idProcess: number, idState: number){
    if (Number(this.form.controls['processName'].value) === idProcess
    && Number(this.form.controls['destiny'].value) != idState) {
      return true;
    } else {
      return false;
    }
  }

  filterStatesDestiny(idProcess: number, idState: number){
    if (Number(this.form.controls['processName'].value) === idProcess
    && Number(this.form.controls['origin'].value) != idState) {
      return true;
    } else {
      return false;
    }
  }

  

}
