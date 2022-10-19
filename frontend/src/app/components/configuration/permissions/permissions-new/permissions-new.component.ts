import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { StatesItem } from 'src/app/models/StatesItem';
import { UsuarioItem } from 'src/app/models/UsuarioItem'
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-permissions-new',
  templateUrl: './permissions-new.component.html',
  styleUrls: ['./permissions-new.component.scss']
})
export class PermissionsNewComponent implements OnInit {

  form:FormGroup;
  processes: ProcessesItem[];
  users: UsuarioItem[];
  states: StatesItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      process: [''],
      user: [''],
      state:['']
    });

    this.processes = []; 
    this.states = []; 
    this.users = [];
    
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

    this.backend.getUsuario().subscribe(x => {
      if (x.status === 1) {
        this.users = x.data;
      }
      
    });
    
  }

  Create() {
    
    if (Number(this.form.controls['process'].value) > 0
        && Number(this.form.controls['user'].value) > 0
        && Number(this.form.controls['state'].value) > 0) {
        
        this.backend.insertPermission(Number(this.form.controls['user'].value),
          Number(this.form.controls['state'].value)).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/permissions/permissions-list');
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

  filterStates(idProcess: number){
    if (Number(this.form.controls['process'].value) === idProcess) {
      return true;
    } else {
      return false;
    }
  }

 
  

}
