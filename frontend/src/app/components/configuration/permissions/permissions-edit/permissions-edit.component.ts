import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { StatesItem } from 'src/app/models/StatesItem';
import { UsuarioItem } from 'src/app/models/UsuarioItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-permissions-edit',
  templateUrl: './permissions-edit.component.html',
  styleUrls: ['./permissions-edit.component.scss']
})
export class PermissionsEditComponent implements OnInit {

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
      }
    );


    
    this.backend.getPermissionById(Number(localStorage.getItem('idPermissionEdit'))).subscribe(x => {
      
      if (x.status === 1) {
          //alert(JSON.stringify(x.data));
          this.form = this.fb.group({
            process: [JSON.parse(JSON.stringify(x.data))[0].idProcess],
            user: [JSON.parse(JSON.stringify(x.data))[0].idUser],
            state: [JSON.parse(JSON.stringify(x.data))[0].idState]
          });

        }
      }
    );

    
    
  }

  update() {
    if (Number(this.form.controls['process'].value) > 0
        && Number(this.form.controls['user'].value) > 0
        && Number(this.form.controls['state'].value) > 0) {
        
      let idPermission = Number(localStorage.getItem('idPermissionEdit')!)
      
      this.backend.updatePermission(idPermission,
        Number(this.form.controls['user'].value),
        Number(this.form.controls['state'].value)).subscribe(x => {
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

  filterStates(idProcess: number){
    if (Number(this.form.controls['process'].value) === idProcess) {
      return true;
    } else {
      return false;
    }
  }

  
}
