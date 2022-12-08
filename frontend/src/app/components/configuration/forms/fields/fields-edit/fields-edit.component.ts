import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { ListsItem } from 'src/app/models/ListsItem';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
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

  processes: ProcessesItem[];

  externalFields: FieldsItem[];

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      name: [''],
      pos: [''],
      type: [''],
      list: [''],
      external: [''],
      externalField: [''],
      externalKey: [''],
      formKey: ['']
    });

    this.field = [];
    
    this.backend.getFieldByIdFormPos(Number(localStorage.getItem('idFormEdit')), Number(localStorage.getItem('posFieldEdit'))).subscribe(x => {
      this.field = x.data;
      //alert(Number(JSON.parse(JSON.stringify(this.user))[0].idTipoUsuario));
      
      let idType = 1;
      switch ( String(JSON.parse(JSON.stringify(this.field))[0].tipo) ) {
        case "external":
          idType = 5;
            break;
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

      //alert(Number(JSON.parse(JSON.stringify(this.field))[0].externalProcess));

      
      this.form = this.fb.group({
        name: [String(JSON.parse(JSON.stringify(this.field))[0].nombre)],
        pos:[Number(JSON.parse(JSON.stringify(this.field))[0].pos)],
        type: [idType],
        list: [Number(JSON.parse(JSON.stringify(this.field))[0].idLista)],
        external: [JSON.parse(JSON.stringify(this.field))[0].externalProcess],
        externalField: [JSON.parse(JSON.stringify(this.field))[0].externalPos],
        externalKey: [JSON.parse(JSON.stringify(this.field))[0].externalKeyPos],
        formKey: [JSON.parse(JSON.stringify(this.field))[0].externalKeyValue]
        //list: [Number(JSON.parse(JSON.stringify(this.field))[0].idLista)]
      });

      this.updateExternalFields(JSON.parse(JSON.stringify(this.field))[0].externalIdForm);
      //alert(Number(this.form.controls['external'].value));
      
    });

    this.lists = [];
    this.processes = [];
    this.externalFields = [];
    
   }

  ngOnInit(): void {
    // carga de listas para cuando el campo es tipo lista
    this.backend.getLists().subscribe(x => {
      this.lists = x.data;

      this.backend.getProcesses().subscribe(x => {
        this.processes = x.data;
        //alert(JSON.stringify(x.data));
      });
      
    });

    

  }

  isList() {
    if (Number(this.form.controls['type'].value) === 3) {
      return true;
    } else {
      return false;
    }
  }

  isExternal() {
    if (Number(this.form.controls['type'].value) === 5) {
      
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

      let externalIdForm = Number(localStorage.getItem('idExternalFormEdit'));
      let externalProcess = Number(this.form.controls['external'].value);
      let externalPos = Number(this.form.controls['externalField'].value);
      let externalKeyPos = Number(this.form.controls['externalKey'].value);
      let externalKeyValue = Number(this.form.controls['formKey'].value);

      this.backend.updateField(
        Number(localStorage.getItem('idFormEdit')), 
        Number(localStorage.getItem('posFieldEdit')), 
        idForm, 
        this.form.controls['pos'].value,
        this.form.controls['type'].value,
        this.form.controls['name'].value,
        idList,
        externalProcess,
        externalIdForm,
        externalPos,
        externalKeyPos,
        externalKeyValue).subscribe(x => {
        
          if (x.status === 0) {
            alert("Error al crear el campo, favor verificar que la posicion este disponible");
          }

        }
      )

      window.location.reload(); 

    } else {
      alert('Error, favor completar todos los campos');
    }


    
  }

  updateExternalFields(idForm: number) {

    this.backend.getFieldsByForm(Number(idForm)).subscribe(x => {
      
      this.externalFields = x.data;

      localStorage.setItem('idExternalFormEdit', String(idForm)); 

      this.backend.getFieldsByForm(Number(localStorage.getItem('idFormEdit'))).subscribe(x => {
        
        this.field = x.data;
        
      });
      
    });

    

  }

  goTo(ruta: string) {
    this.router.navigateByUrl('/' + ruta);
  }

  
  filterProcess(idForm: number){
    let idFormEdit = localStorage.getItem('idFormEdit');
    if (Number(idFormEdit) !== idForm) {
      return true;
    } else {
      return false;
    }
  }


}
