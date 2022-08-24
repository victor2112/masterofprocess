import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  constructor(private backend: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }



  irA(ruta: string) {
      
    if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }


}
