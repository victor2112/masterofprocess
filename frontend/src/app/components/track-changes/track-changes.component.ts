import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LogItem } from 'src/app/models/LogItem';

@Component({
  selector: 'app-track-changes',
  templateUrl: './track-changes.component.html',
  styleUrls: ['./track-changes.component.scss']
})
export class TrackChangesComponent implements AfterViewInit  {
  displayedColumns: string[] = ['Modification Date', 'User', "Modification Type", "Before", "After"];
  dataSource: MatTableDataSource<LogItem>;
  logs : LogItem[];
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
      this.logs = [];
      this.idInstance = 0;
      this.idUsuario = 0;
      this.idProcess = 0;
      this.processName = ""
      
   
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<LogItem>(this.logs);
   

    }

    ngOnInit(): void {
      this.processName = localStorage.getItem('nombreProceso')!;
      this.idUsuario = Number(localStorage.getItem('idUsuario'));
      this.idProcess = Number(localStorage.getItem('idProceso'));
      this.idInstance = Number(localStorage.getItem('idInstancia'));;
      this.backend.getLogs(this.idInstance).subscribe(x => {
        this.logs = x.data;
        this.dataSource = new MatTableDataSource<LogItem>(this.logs);

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
    localStorage.setItem('idEstadoInstancia', instance["idEstado"]);
    this.irA('/forms');
  }



}
