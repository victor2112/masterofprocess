import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StatesItem } from 'src/app/models/StatesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements AfterViewInit {

  states: StatesItem[];
  displayedColumns: string[] = ['State Name', 'Process Name', 'Initial', 'Final', 'Buttons'];
  dataSource: MatTableDataSource<StatesItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      
      this.states = [];
      this.dataSource = new MatTableDataSource<StatesItem>(this.states);
      
    }

  ngOnInit(): void {
  
    this.backend.getStates().subscribe(x => {
      this.states = x.data;
      this.dataSource = new MatTableDataSource<StatesItem>(this.states);
      this.dataSource.paginator = this.paginator!;
    });
  
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

  goToEdit(ruta: string, idState: number){
    localStorage.setItem('idStateEdit', String(idState)); 
    this.router.navigateByUrl('/' + ruta);
  }

  delete(idState: number) {
  
    this.backend.deleteState(idState).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  
  }

}
