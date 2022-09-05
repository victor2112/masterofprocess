import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { InstancesItem } from 'src/app/models/InstancesItem';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements AfterViewInit  {
  displayedColumns: string[] = ['idInstancia', 'Estado', 'Fecha Creacion', 'Fecha Modificacion'];
  dataSource: MatTableDataSource<InstancesItem>;
  instances : InstancesItem[];
  idProcess : number;
  idUsuario : number;
  idInstance : number;
  processName : string;

 

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(private backend: BackendService,
    private router: Router) { 
      this.instances = [];
      this.idInstance = 0;
      this.idUsuario = 0;
      this.idProcess = 0;
      this.processName = ""
      
   
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<InstancesItem>(this.instances);
   

    }

    ngOnInit(): void {
      this.processName = localStorage.getItem('nombreProceso')!;
      this.idUsuario = Number(localStorage.getItem('idUsuario'));
      this.idProcess = Number(localStorage.getItem('idProceso'));
      this.backend.getInstances(this.idUsuario, this.idProcess).subscribe(x => {
        this.instances = x.data;
        this.dataSource = new MatTableDataSource<InstancesItem>(this.instances);

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

  



  irA(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }

  getItems(data: any){
    let instance = JSON.parse(JSON.stringify(data));
    localStorage.setItem('idInstancia', instance["idInstancia"]);
    localStorage.setItem('estadoInstancia', instance["estado"]);
    this.irA('/forms');
  }



}
