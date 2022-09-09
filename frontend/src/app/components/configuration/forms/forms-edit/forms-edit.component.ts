import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-forms-edit',
  templateUrl: './forms-edit.component.html',
  styleUrls: ['./forms-edit.component.scss']
})
export class FormsEditComponent implements AfterViewInit  {

  fields: FieldsItem[];
  displayedColumns: string[] = ['Name', 'Position', 'Type', 'Edit'  ];
  dataSource: MatTableDataSource<FieldsItem>;
  formName: string;
  idForm: number;
  form:FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      this.idForm = Number(localStorage.getItem('idFormEdit'))!;
      this.form = this.fb.group({
        formName: ['']
      });
      this.backend.getFormByIdForm(this.idForm).subscribe(x => {
        this.formName = JSON.parse(JSON.stringify(x.data))[0]['name'];
        this.form = this.fb.group({
          formName: [this.formName]
        });
      });
      this.fields = [];
      this.formName = "";
      this.dataSource = new MatTableDataSource<FieldsItem>(this.fields);
      
    }

  ngOnInit(): void {
    this.backend.getFieldsByForm(this.idForm).subscribe(x => {
      this.fields = x.data;
      this.dataSource = new MatTableDataSource<FieldsItem>(this.fields);
      this.dataSource.paginator = this.paginator!;
    });
  }

  updateFormName(idForm: number) {
    this.backend.updateForm(idForm, this.form.controls['formName'].value).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    })
    window.location.reload(); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goTo(ruta: string){
    this.router.navigateByUrl('/' + ruta);
  }

  goToEdit(ruta: string, pos: number){
    localStorage.setItem('posFieldEdit', String(pos)); 
    this.router.navigateByUrl('/' + ruta);
  }

  deleteField(pos: number) {
    this.backend.deleteField(this.idForm, pos).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  }

}
