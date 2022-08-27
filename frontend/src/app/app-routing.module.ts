import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { ProcessComponent } from './components/process/process.component';
import { InstancesComponent } from './components/instances/instances.component';
import { FormsComponent } from './components/forms/forms.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'ingresar', component:IngresarComponent},
  {path: 'register', component:RegistrarComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'consultar', component:ConsultarComponent},
  {path: 'processes', component:ProcessComponent},
  {path: 'instances', component:InstancesComponent},
  {path: 'forms', component:FormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
