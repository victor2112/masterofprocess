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
  

  constructor(private backend: BackendService,
    private router: Router) { 
      this.processes = [];
    }

  ngOnInit(): void {
    this.backend.getProcess(1).subscribe(x => {
      this.processes = x.data;
    })
  }



  irA(ruta: string) {
      
    if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }


}
