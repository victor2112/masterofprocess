import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-states-edit',
  templateUrl: './states-edit.component.html',
  styleUrls: ['./states-edit.component.scss']
})
export class StatesEditComponent implements OnInit {

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



    this.backend.getStateById(Number(localStorage.getItem('idStateEdit'))).subscribe(x => {
        if (x.status === 1) {
          
          this.form = this.fb.group({
            stateName: [JSON.parse(JSON.stringify(x.data))[0].stateName],
            processName: [JSON.parse(JSON.stringify(x.data))[0].idProcess],
            initial: [JSON.parse(JSON.stringify(x.data))[0].initial],
            final: [JSON.parse(JSON.stringify(x.data))[0].final]
          });

        }
      }
    );

    
    
  }

  update() {
    if (this.form.controls['stateName'].value.length > 0
        && Number(this.form.controls['processName'].value) > 0
        && this.form.controls['initial'].value.length > 0
        && this.form.controls['final'].value.length > 0) {
        
      let idState = Number(localStorage.getItem('idStateEdit')!)
      
      this.backend.updateState(idState,
            this.form.controls['stateName'].value,
            Number(this.form.controls['processName'].value),
            this.form.controls['initial'].value,
            this.form.controls['final'].value).subscribe(x => {
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

}
