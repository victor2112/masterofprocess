import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { StatesItem } from 'src/app/models/StatesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-transitions-edit',
  templateUrl: './transitions-edit.component.html',
  styleUrls: ['./transitions-edit.component.scss']
})

export class TransitionsEditComponent implements OnInit {

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


    
    this.backend.getTransitionById(Number(localStorage.getItem('idTransitionEdit'))).subscribe(x => {
      
      if (x.status === 1) {
          //alert(JSON.stringify(x.data));
          this.form = this.fb.group({
            processName: [JSON.parse(JSON.stringify(x.data))[0].idProcess],
            origin: [JSON.parse(JSON.stringify(x.data))[0].idOrigin],
            destiny: [JSON.parse(JSON.stringify(x.data))[0].idDestiny]
          });

        }
      }
    );

    
    
  }

  update() {
    if (Number(this.form.controls['processName'].value) > 0
        && Number(this.form.controls['origin'].value) > 0
        && Number(this.form.controls['destiny'].value) > 0) {
        
      let idTransition = Number(localStorage.getItem('idTransitionEdit')!)
      
      this.backend.updateTransition(idTransition,
        Number(this.form.controls['origin'].value),
        Number(this.form.controls['destiny'].value),
        Number(this.form.controls['processName'].value)).subscribe(x => {
        if (x.status === 1) {
          alert(x.message);
        }
      })

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
