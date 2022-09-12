import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-lists-new',
  templateUrl: './lists-new.component.html',
  styleUrls: ['./lists-new.component.scss']
})
export class ListsNewComponent implements OnInit {

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

  Save() {
    if (this.form.controls['name'].value.length > 0) {
        
        this.backend.insertList(this.form.controls['name'].value).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/lists/lists-list');
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
