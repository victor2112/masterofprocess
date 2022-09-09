import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { ListsItem } from 'src/app/models/ListsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-fields-edit',
  templateUrl: './fields-edit.component.html',
  styleUrls: ['./fields-edit.component.scss']
})
export class FieldsEditComponent implements OnInit {

  form:FormGroup;

  field: FieldsItem[];

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

    this.field = []
    
    this.backend.getFieldByIdFormPos(Number(localStorage.getItem('idFormEdit')), Number(localStorage.getItem('posFieldEdit'))).subscribe(x => {
      this.field = x.data;
      //alert(Number(JSON.parse(JSON.stringify(this.user))[0].idTipoUsuario));
      
      let idType = 1;
      switch ( String(JSON.parse(JSON.stringify(this.field))[0].tipo) ) {
        case "date":
          idType = 4;
            break;
        case "list":
          idType = 3;
          break;
        case "number":
          idType = 2;
          break;
        default: 
          break;
      };

      alert(Number(JSON.parse(JSON.stringify(this.field))[0].idLista));
      
      this.form = this.fb.group({
        name: [String(JSON.parse(JSON.stringify(this.field))[0].nombre)],
        pos:[Number(JSON.parse(JSON.stringify(this.field))[0].pos)],
        type: [idType],
        list: [Number(JSON.parse(JSON.stringify(this.field))[0].idLista)]
        //list: [Number(JSON.parse(JSON.stringify(this.field))[0].idLista)]
      });

      
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

  edit() {

    if (this.form.controls['name'].value.length > 0 && Number(this.form.controls['pos'].value) > 0 &&
        this.form.controls['type'].value > 0) {
      let idForm = Number(localStorage.getItem('idFormEdit')!)
      var idList = 1;
      if (this.form.controls['type'].value === 3) {
        idList = Number(this.form.controls['list'].value);
      };

      alert(Number(this.form.controls['list'].value));
      this.backend.updateField(
        Number(localStorage.getItem('idFormEdit')), 
        Number(localStorage.getItem('posFieldEdit')), 
        idForm, 
        this.form.controls['pos'].value,
        this.form.controls['type'].value,
        this.form.controls['name'].value,
        idList).subscribe(x => {
        
          if (x.status === 1) {
            alert(x.message);
          } else {
            alert("Error al crear el campo, favor verificar que la posicion este disponible");
          }

        }
      )

      this.router.navigateByUrl('/configuration/forms/forms-edit');

    } else {
      alert('Error, favor completar todos los campos');
    }


    
  }



  goTo(ruta: string) {
    this.router.navigateByUrl('/' + ruta);
  }
}
