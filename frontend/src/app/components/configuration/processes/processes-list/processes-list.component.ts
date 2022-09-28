import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProcessesItem } from 'src/app/models/ProcessesItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-processes-list',
  templateUrl: './processes-list.component.html',
  styleUrls: ['./processes-list.component.scss']
})
export class ProcessesListComponent implements AfterViewInit {

  processes: ProcessesItem[];
  displayedColumns: string[] = ['Process Name', 'Date Created', 'Form Name', 'Buttons'];
  dataSource: MatTableDataSource<ProcessesItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      
      this.processes = [];
      this.dataSource = new MatTableDataSource<ProcessesItem>(this.processes);
      
    }

  ngOnInit(): void {
  
    this.backend.getProcesses().subscribe(x => {
      this.processes = x.data;
      this.dataSource = new MatTableDataSource<ProcessesItem>(this.processes);
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

  goToEdit(ruta: string, idProcess: number){
    localStorage.setItem('idProcessEdit', String(idProcess)); 
    this.router.navigateByUrl('/' + ruta);
  }

  delete(idProcess: number) {
  
    this.backend.deleteProcess(idProcess).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  
  }

}
