import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListsItem } from 'src/app/models/ListsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-fields-new',
  templateUrl: './fields-new.component.html',
  styleUrls: ['./fields-new.component.scss']
})
export class FieldsNewComponent implements OnInit {

  form:FormGroup;

  lists: ListsItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      name: [''],
      pos: [''],
      type: [''],
      list: ['']
    });

    this.lists = [];
    
   }

  ngOnInit(): void {
    // carga de listas para cuando el campo es tipo lista
    this.backend.getLists().subscribe(x => {
      this.lists = x.data;
    })
  }

  isList() {
    if (Number(this.form.controls['type'].value) === 3) {
      return true;
    } else {
      return false;
    }
  }

  create() {

    if (this.form.controls['name'].value.length > 0 && Number(this.form.controls['pos'].value) > 0 &&
        this.form.controls['type'].value > 0) {
      let idForm = Number(localStorage.getItem('idFormEdit')!);
      let idList = 1;
      if (this.form.controls['type'].value === 3) {
        idList = Number(this.form.controls['list'].value);
        alert(idList);
      };


      this.backend.insertField(idForm, 
        this.form.controls['pos'].value,
        this.form.controls['type'].value,
        this.form.controls['name'].value,
        idList).subscribe(x => {
        
          if (x.status === 1) {
            alert(x.message);
            this.router.navigateByUrl('/configuration/forms/forms-edit');
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
