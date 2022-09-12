import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { ListsItem } from 'src/app/models/ListsItem';
import { ListValue } from 'src/app/models/ListValue';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-values-edit',
  templateUrl: './values-edit.component.html',
  styleUrls: ['./values-edit.component.scss']
})
export class ValuesEditComponent implements OnInit {

  form:FormGroup;

  value: ListValue[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      name: ['']
    });

    this.value = []
    
    this.backend.getValueByIdValue(Number(localStorage.getItem('idValueEdit'))).subscribe(x => {
      this.value = x.data;
      
      
      this.form = this.fb.group({
        name: [String(JSON.parse(JSON.stringify(this.value))[0].name)]
      });

      
    });

    
    
   }

  ngOnInit(): void {

  }



  edit() {

    if (this.form.controls['name'].value.length > 0) {
      let idValue = Number(localStorage.getItem('idValueEdit')!)
      
      this.backend.updateValue(idValue, this.form.controls['name'].value).subscribe(x => {
        
          if (x.status === 0) {
            alert("Error al actualizar el campo, favor verificar el nombre ingresado");
          }

        }
      )

      window.location.reload(); 

    } else {
      alert('Error, favor completar todos los campos');
    }


    
  }



  goTo(ruta: string) {
    this.router.navigateByUrl('/' + ruta);
  }
}
