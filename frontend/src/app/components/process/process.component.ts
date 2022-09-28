import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { ProcessItem } from 'src/app/models/ProcessItem';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  processes : ProcessItem[];
  idProcess : number;
  idUsuario : number;

  constructor(private backend: BackendService,
    private router: Router) { 
      this.processes = [];
      this.idProcess = 0;
      this.idUsuario = 0;
    }

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.backend.getProcess(this.idUsuario).subscribe(x => {
      this.processes = x.data;
      //alert(JSON.stringify(this.processes));
    })

  
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
    let process = JSON.parse(JSON.stringify(data));
    this.idProcess = process["idProceso"];
    localStorage.setItem('idProceso', process["idProceso"]);
    localStorage.setItem('nombreProceso', process["nombreProceso"]);
    this.irA('/instances');
  }

}
