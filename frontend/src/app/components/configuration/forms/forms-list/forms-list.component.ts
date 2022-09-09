import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsItem } from 'src/app/models/FormsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements AfterViewInit {

  forms: FormsItem[];
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<FormsItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private backend: BackendService,
    private router: Router) { 
      this.forms = [];
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<FormsItem>(this.forms);
    }

  ngOnInit(): void {
    this.backend.getFormsList().subscribe(x => {
      this.forms = x.data;
      this.dataSource = new MatTableDataSource<FormsItem>(this.forms);
      this.dataSource.paginator = this.paginator!;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  goToEdit(ruta: string, idForm: number, formName: string){
    localStorage.setItem('idFormEdit', String(idForm)); 
    localStorage.setItem('formNameEdit', String(formName)); 
    this.router.navigateByUrl('/' + ruta);
  }


  irA(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }

  
  deleteForm(idForm: number) {
    this.backend.deleteForm(idForm).subscribe(x => {
      alert(x.message);
      window.location.reload();
    })
  }

}
