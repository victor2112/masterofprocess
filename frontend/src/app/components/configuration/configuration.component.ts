import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {


  


  constructor(private router: Router) { }

  ngOnInit(): void {
  }



  goTo(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }


}
