import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListsItem } from 'src/app/models/ListsItem';
import { ListValue } from 'src/app/models/ListValue';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-values-new',
  templateUrl: './values-new.component.html',
  styleUrls: ['./values-new.component.scss']
})
export class ValuesNewComponent implements OnInit {
  
  form:FormGroup;

  values: ListValue[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      name: ['']
    });

    this.values = [];
    
   }

  ngOnInit(): void {
 
  }



  create() {

    if (this.form.controls['name'].value.length) {
      let idList = Number(localStorage.getItem('idListEdit')!)
      
      this.backend.insertValue(idList, 
        this.form.controls['name'].value).subscribe(x => {
        
          if (x.status === 1) {
            //alert(x.message);
            this.router.navigateByUrl('/configuration/lists/lists-edit');
          } else {
            alert("Error al crear el campo, favor verificar que la posicion este disponible");
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
