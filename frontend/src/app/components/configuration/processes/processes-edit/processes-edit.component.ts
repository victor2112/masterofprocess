import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsItem } from 'src/app/models/FormsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-processes-edit',
  templateUrl: './processes-edit.component.html',
  styleUrls: ['./processes-edit.component.scss']
})
export class ProcessesEditComponent implements OnInit {

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



    this.backend.getProcessesById(Number(localStorage.getItem('idProcessEdit'))).subscribe(x => {
        if (x.status === 1) {
          
          this.form = this.fb.group({
            processName: [JSON.parse(JSON.stringify(x.data))[0].processName],
            formName: [Number(JSON.parse(JSON.stringify(x.data))[0].idForm)]
          });

        }
      }
    );

    
    
  }

  update() {
    if (this.form.controls['processName'].value.length > 0
        && this.form.controls['formName'].value > 0) {
        
        let idProcess = Number(localStorage.getItem('idProcessEdit')!)
        
        this.backend.updateProcess(idProcess,
              this.form.controls['processName'].value,
              this.form.controls['formName'].value).subscribe(x => {
          if (x.status === 1) {
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

}
