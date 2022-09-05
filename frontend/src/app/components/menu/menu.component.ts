import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  idTipoUsuario: number;

  constructor (private router: Router) {
    this.idTipoUsuario = 0;
   }

  
  irA(ruta: string) {
    this.router.navigateByUrl('/' + ruta);
  }

  ngOnInit(): void {
    this.idTipoUsuario = Number(localStorage.getItem('idTipoUsuario'));
  }

}
