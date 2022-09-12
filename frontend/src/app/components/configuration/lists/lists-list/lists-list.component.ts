import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListsItem } from 'src/app/models/ListsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements AfterViewInit {

  lists: ListsItem[];
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<ListsItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private backend: BackendService,
    private router: Router) { 
      this.lists = [];
      
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<ListsItem>(this.lists);
    }

  ngOnInit(): void {
    this.backend.getLists().subscribe(x => {
      this.lists = x.data;
      this.dataSource = new MatTableDataSource<ListsItem>(this.lists);
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

  
  goToEdit(ruta: string, idList: number){
    localStorage.setItem('idListEdit', String(idList)); 
    this.router.navigateByUrl('/' + ruta);
  }


  goTo(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }

  
  delete(idList: number) {
    this.backend.deleteList(idList).subscribe(x => {
      alert(x.message);
      window.location.reload();
    })
  }

}
