import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { ListsItem } from 'src/app/models/ListsItem';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-fields-new',
  templateUrl: './fields-new.component.html',
  styleUrls: ['./fields-new.component.scss']
})
export class FieldsNewComponent implements OnInit {

  form:FormGroup;

  lists: ListsItem[];

  field: FieldsItem[];

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

    this.lists = [];

    this.field = [];

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


    })
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

  create() {

    if (this.form.controls['name'].value.length > 0 && Number(this.form.controls['pos'].value) > 0 &&
        this.form.controls['type'].value > 0) {
      let idForm = Number(localStorage.getItem('idFormEdit')!);
      let idList = 1;
      if (this.form.controls['type'].value === 3) {
        idList = Number(this.form.controls['list'].value);
        //alert(idList);
      };


      let externalIdForm = Number(localStorage.getItem('idExternalFormEdit'));
      let externalProcess = Number(this.form.controls['external'].value);
      let externalPos = Number(this.form.controls['externalField'].value);
      let externalKeyPos = Number(this.form.controls['externalKey'].value);
      let externalKeyValue = Number(this.form.controls['formKey'].value);

      this.backend.insertField(idForm, 
        this.form.controls['pos'].value,
        this.form.controls['type'].value,
        this.form.controls['name'].value,
        idList,
        externalProcess,
        externalIdForm,
        externalPos,
        externalKeyPos,
        externalKeyValue).subscribe(x => {
        
          if (x.status === 1) {
            //alert(x.message);
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


  updateExternalFields(idForm: number) {

    this.backend.getFieldsByForm(Number(idForm)).subscribe(x => {
      
      this.externalFields = x.data;

      localStorage.setItem('idExternalFormEdit', String(idForm)); 

      this.backend.getFieldsByForm(Number(localStorage.getItem('idFormEdit'))).subscribe(x => {
        
        this.field = x.data;
        
      });
      
    });

    

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
