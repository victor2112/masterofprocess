
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioItem } from 'src/app/models/UsuarioItem';
import { BackendService } from 'src/app/service/backend.service';

  
  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarios: UsuarioItem[];
  
  ngOnInit(): void {
    
  }

  Ingresar() {
    alert("Ingresa");
  }

  Registrar() {
    alert("Registra");
  }


  form:FormGroup;
  
  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.usuarios = [];
    this.form = this.fb.group({
      usuario: [''],
      password: ['']
    });
    
   }

/*
   if(resultado.usuarios.length > 0) {
    return true;
  } else {
    return false;
  };
*/


irA(ruta: string) {
  if (ruta == 'menu') {
    this.backend.verificaUsuario(this.form.controls['usuario'].value, this.form.controls['password'].value).subscribe(x => {
      this.usuarios = x.usuarios;
  
      if (this.usuarios.length > 0) {
        this.router.navigateByUrl('/' + ruta);
      } else {
        alert('Usuario o contraseña incorrecta, favor intentar nuevamente');
      }
    })
  } else {
    this.router.navigateByUrl('/' + ruta);
  }
    
    /*
    {
      alert(this.usuarios.length);
    }
    if (ruta == 'menu') {
      alert(this.usuarios.length);
    } else {
      this.router.navigateByUrl('/' + ruta);
    }*/

  }

  

  

}
