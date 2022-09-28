import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsItem } from 'src/app/models/FormsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-processes-new',
  templateUrl: './processes-new.component.html',
  styleUrls: ['./processes-new.component.scss']
})
export class ProcessesNewComponent implements OnInit {

  form:FormGroup;
  formsLists: FormsItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      processName: [''],
      formName: ['']
    });

    this.formsLists = []; 
    
   }

  ngOnInit(): void {

    this.backend.getFormsList().subscribe(x => {
          if (x.status === 1) {
            this.formsLists = x.data;
          }
        }
    );

    
    
  }

  Create() {
    if (this.form.controls['processName'].value.length > 0
        && this.form.controls['formName'].value > 0) {
        
        let idUser = Number(localStorage.getItem('idUsuario')!)
        
        this.backend.insertProcess(this.form.controls['processName'].value,
              idUser,
              this.form.controls['formName'].value).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/processes/processes-list');
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
