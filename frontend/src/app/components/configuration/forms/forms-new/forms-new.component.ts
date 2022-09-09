import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/service/backend.service';


@Component({
  selector: 'app-forms-new',
  templateUrl: './forms-new.component.html',
  styleUrls: ['./forms-new.component.scss']
})
export class FormsNewComponent implements OnInit {

  form:FormGroup;

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      name: ['']
    });
    
   }

  ngOnInit(): void {
  }

  Grabar() {
    if (this.form.controls['name'].value.length > 0) {
        
        this.backend.insertForm(this.form.controls['name'].value).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/forms/forms-list');
          }
        }
      )

    } else {
      alert('Error, favor completar todos los campos');
    }
    
  }



  irA(ruta: string) {
    this.router.navigateByUrl('/' + ruta);  
  }

}
