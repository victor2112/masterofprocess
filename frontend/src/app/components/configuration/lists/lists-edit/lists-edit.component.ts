import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListValue } from 'src/app/models/ListValue';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-lists-edit',
  templateUrl: './lists-edit.component.html',
  styleUrls: ['./lists-edit.component.scss']
})
export class ListsEditComponent implements AfterViewInit {

  values: ListValue[];
  displayedColumns: string[] = ['Name', 'Edit'  ];
  dataSource: MatTableDataSource<ListValue>;
  listName: string;
  idList: number;
  form:FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      this.idList = Number(localStorage.getItem('idListEdit'))!;
      this.form = this.fb.group({
        listName: ['']
      });
      this.listName = "";


      this.backend.getListName(this.idList).subscribe(x => {
        //alert(JSON.stringify(JSON.parse(JSON.stringify(x.data))[0]['name']));
        this.listName = JSON.parse(JSON.stringify(x.data))[0]['name'];
        this.form = this.fb.group({
          listName: [this.listName]
        });
      });
      



      this.values = [];
      this.dataSource = new MatTableDataSource<ListValue>(this.values);
      
    }

  ngOnInit(): void {
    this.backend.getListValues(this.idList).subscribe(x => {
      this.values = x.data;
      //alert(JSON.stringify(this.values));
      this.dataSource = new MatTableDataSource<ListValue>(this.values);
      this.dataSource.paginator = this.paginator!;
    });




  }

  updateListName(idList: number) {
    this.backend.updateList(idList, this.form.controls['listName'].value).subscribe(x => {
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

  goToEdit(ruta: string, idValue: number){
    localStorage.setItem('idValueEdit', String(idValue)); 
    this.router.navigateByUrl('/' + ruta);
  }

  delete(idValue: number) {
    //alert("se liminara el idValor: " + idValue);
    
    this.backend.deleteValue(idValue).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  }

}
