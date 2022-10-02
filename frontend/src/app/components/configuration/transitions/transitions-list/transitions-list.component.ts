import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransitionItem } from 'src/app/models/TransitionItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-transitions-list',
  templateUrl: './transitions-list.component.html',
  styleUrls: ['./transitions-list.component.scss']
})
export class TransitionsListComponent implements AfterViewInit {

  transitions: TransitionItem[];
  displayedColumns: string[] = ['Transition ID', 'Origin State', 'Destiny State', 'Process Name', 'Buttons'];
  dataSource: MatTableDataSource<TransitionItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      
      this.transitions = [];
      this.dataSource = new MatTableDataSource<TransitionItem>(this.transitions);
      
    }

  ngOnInit(): void {
  
    this.backend.getTransitions().subscribe(x => {
      this.transitions = x.data;
      this.dataSource = new MatTableDataSource<TransitionItem>(this.transitions);
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

  goToEdit(ruta: string, idTransition: number){
    localStorage.setItem('idTransitionEdit', String(idTransition)); 
    this.router.navigateByUrl('/' + ruta);
  }

  delete(idTransition: number) {
  
    this.backend.deleteTransition(idTransition).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  
  }

}


  


