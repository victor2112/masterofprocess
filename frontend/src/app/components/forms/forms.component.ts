import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { Values } from 'src/app/models/Values';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit  {

  values : Values[];
  idInstance : number;
  processName : string;

  forms : FormGroup;




  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      this.forms= this.fb.group({
        
      });

      this.idInstance = Number(localStorage.getItem('idInstancia'));
      
      this.backend.getForms(this.idInstance).subscribe(x => {
        this.values = x.data;

   

        this.values.forEach(element => {
          //alert(element.nombre);
          //alert(element.valor);
          let nombre = element.nombre;
          let valor = element.valor;
          
   
          this.forms.addControl(nombre, new FormControl(valor, Validators.required));
          
        });
        
        
      });
      


      this.values = [];
      
      this.processName = ""

      
   


    }

    ngOnInit(): void {
      this.processName = localStorage.getItem('nombreProceso')!;
      
      this.idInstance = Number(localStorage.getItem('idInstancia'));

    }

 
   

  



  irA(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }

  




  save() {
    
    this.values.forEach(element => {
      //alert(element.nombre);
      //alert(element.valor);
      
      let idFormulario = element.idFormulario;
      let pos = element.pos;
      let valor = this.forms.controls[element.nombre].value;
      

      this.backend.updateForms(idFormulario, pos, this.idInstance, valor).subscribe(x => {
          if (x.status === 0) {
            alert("Error al actualizar el formulario, verificar los datos ingresados");
          } else {
            //alert(x.message);
          }
        }
      )
      
    });

    alert("Formulario actualizado satisfactoriamente.");
    
    
    
  }

}

