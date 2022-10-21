import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { Values } from 'src/app/models/Values';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Lists } from 'src/app/models/Lists';
import { TransitionItem } from 'src/app/models/TransitionItem';
import { InstancesItem } from 'src/app/models/InstancesItem';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit  {

  values : Values[];
  idInstance : number;
  processName : string;
  transitions : TransitionItem[];

  forms : FormGroup;

  lists : Lists[];
  idState : number;


  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      this.lists = [];
      this.transitions = [];
      this.idState = 0;
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

   
            if (element.idLista > 1) {
              
              
              this.backend.getListValues(element.idLista).subscribe(x => {
                this.lists.push({idList: element.idLista, values: x.data});
                //alert(JSON.stringify(JSON.parse(JSON.stringify(this.lists)).idList));
                //alert(JSON.stringify(this.lists));
    
              });
            } 
        
          
          
        });
        
        
      });
      


      this.values = [];
      
      this.processName = ""

      

      
   


    }

    ngOnInit(): void {
      this.processName = localStorage.getItem('nombreProceso')!;
      
      this.idInstance = Number(localStorage.getItem('idInstancia'));
      //alert(JSON.stringify(this.values));



      // Campo para cambiar de estado
      this.forms.addControl("estado", new FormControl("", Validators.required));
      this.backend.getTransitionsByForm(Number(localStorage.getItem('idProceso')), Number(localStorage.getItem('idEstadoInstancia'))).subscribe(x => {
        this.transitions = x.data;
      });
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

    let idUsuario = Number(localStorage.getItem('idUsuario'));
    this.backend.updateInstanceModificationData(this.idInstance, idUsuario).subscribe(x => {
      if (x.status === 0) {
        alert("Error al actualizar los datos de modificacion para la instancia");
      }
    });

    // Registro de transicion de estado si fue modificado
    if (this.forms.controls["estado"].value) {
      //alert(this.forms.controls["estado"].value);
      let idState = this.forms.controls["estado"].value;
      

      this.backend.updateInstanceState(this.idInstance, idState, idUsuario).subscribe(x => {
        if (x.status === 0) {
          alert("Error al actualizar el formulario, verificar los datos ingresados");
        }
        this.idState = idState;

        //Verificar si el usuario puede ver el nuevo estado para continuar en el formulario
        let reload = 0;
        
        let idProcess = Number(localStorage.getItem('idProceso'));
        this.backend.getInstances(idUsuario, idProcess).subscribe(x => {
          let instances : InstancesItem[] = x.data;
          instances.forEach(element => {
            if (element.idEstado === idState) {
              reload = 1;
            }
          });

          if (reload === 1) {
            this.backend.getTransitionsByForm(Number(localStorage.getItem('idProceso')), idState).subscribe(x => {
              this.transitions = x.data;
            });
            localStorage.setItem('idEstadoInstancia', idState);
            
            window.location.reload();
            //this.router.navigateByUrl('/forms'); 
          } else {
            this.router.navigateByUrl('/instances'); 
          }
        })
      })
    }
    
    
  }

}

