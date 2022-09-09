import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FieldsItem } from 'src/app/models/FieldsItem';
import { ListValue } from 'src/app/models/ListValue';
import { Lists } from 'src/app/models/Lists';

@Component({
  selector: 'app-new-instance',
  templateUrl: './new-instance.component.html',
  styleUrls: ['./new-instance.component.scss']
})
export class NewInstanceComponent implements OnInit  {

  fields : FieldsItem[];
  idProcess : number;
  processName : string;

  forms : FormGroup;
  idInstance : number;


  /////////////////////
  list : ListValue[];
  //////////////////
  lists : Lists[];
  

  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      this.list = [];
      this.lists = [];
      
      this.forms= this.fb.group({
        
      });
      this.idInstance = 0;
      this.idProcess = Number(localStorage.getItem('idProceso'));
      this.fields = [];
      this.backend.getFields(this.idProcess).subscribe(x => {
        this.fields = x.data;

   

        this.fields.forEach(element => {
          //alert(element.nombre);
          //alert(element.valor);
          let nombre = element.nombre;
          

          this.forms.addControl(nombre, new FormControl("", Validators.required));
          
          
          
          localStorage.setItem('idFormulario', element.idFormulario + "");      
          
        });
        
        
        
      });
      


      
      
      this.processName = ""

      
   


    }



    ngOnInit(): void {
      this.processName = localStorage.getItem('nombreProceso')!;
      
      

      this.list = [{nombre: 'Efectivo'}, {nombre: 'Tarjeta'}];


      
      this.backend.getFields(this.idProcess).subscribe(x => {
        this.fields = x.data;
        //alert(JSON.stringify(this.fields));
        this.fields.forEach(element => {
          //alert(element.nombre);
          //alert(JSON.stringify(element));
          
          if (element.idLista > 1) {
            
            
            this.backend.getListValues(element.idLista).subscribe(x => {
              this.lists.push({idList: element.idLista, values: x.data});
              //alert(JSON.stringify(JSON.parse(JSON.stringify(this.lists)).idList));
              //alert(JSON.stringify(this.lists));

            });
          } 
        });
      });
    }

 



  irA(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  };

  




  save() {
    // Obtener idInstancia max + 1
    this.backend.getInstancesNumber().subscribe(x => {
      this.idInstance = JSON.parse(JSON.stringify(x.data))[0]['instancias'] + 1;
    
      Number(localStorage.getItem('idFormulario'));
      
      
      this.backend.getInitialState(Number(localStorage.getItem('idProceso'))).subscribe(x => {
        if (x.status === 0) {
          alert("Error al obtener el estado initial");
        } else {
              
          
          let idEstado = Number(JSON.parse(JSON.stringify(x.data))[0].idEstado);
          alert(String(idEstado));
    
          
          //alert("Insert de instancia");
          // Insert de instancia
          this.backend.insertInstance(Number(localStorage.getItem('idFormulario')), idEstado).subscribe(x => {
            if (x.status === 0) {
              alert("Error al crear la instancia, verificar los datos ingresados");
            } else {
              localStorage.setItem('idInstancia', JSON.parse(JSON.stringify(x.data))['insertId'] + "");
            }
          }

          );
          
          
          

          //alert("Insert de valores_campos");
          // Insert de valores_campos
          this.fields.forEach(element => {
            
            
            let pos = element.pos;
            let valor = this.forms.controls[element.nombre].value;
            

            this.backend.insertFieldsValues(Number(localStorage.getItem('idFormulario')), pos, this.idInstance, valor).subscribe(x => {
                if (x.status === 0) {
                  alert("Error al actualizar el formulario, verificar los datos ingresados");
                } else {
                  //alert(x.message);
                }
              }
            )
            
          });


          this.router.navigateByUrl('/instances'); 

      
        }
      });

      
    });

  }

}

