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
import { NewInstanceComponent } from './components/new-instance/new-instance.component';
import { ConfigurationComponent } from './components/configuration/configuration.component'
import { UsersListComponent } from './components/configuration/users/users-list/users-list.component';
import { UsersNewComponent } from './components/configuration/users/users-new/users-new.component';
import { UsersEditComponent } from './components/configuration/users/users-edit/users-edit.component';
import { FormsListComponent } from './components/configuration/forms/forms-list/forms-list.component';
import { FormsEditComponent } from './components/configuration/forms/forms-edit/forms-edit.component';
import { FormsNewComponent } from './components/configuration/forms/forms-new/forms-new.component';
import { FieldsNewComponent } from './components/configuration/forms/fields/fields-new/fields-new.component';
import { FieldsEditComponent } from './components/configuration/forms/fields/fields-edit/fields-edit.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'ingresar', component:IngresarComponent},
  {path: 'register', component:RegistrarComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'consultar', component:ConsultarComponent},
  {path: 'processes', component:ProcessComponent},
  {path: 'instances', component:InstancesComponent},
  {path: 'forms', component:FormsComponent},
  {path: 'newInstance', component:NewInstanceComponent},
  {path: 'configuration', component:ConfigurationComponent},
  {path: 'configuration/users/users-list', component:UsersListComponent},
  {path: 'configuration/users/users-new', component:UsersNewComponent},
  {path: 'configuration/users/users-edit', component:UsersEditComponent},
  {path: 'configuration/forms/forms-list', component:FormsListComponent},
  {path: 'configuration/forms/forms-new', component:FormsNewComponent},
  {path: 'configuration/forms/forms-edit', component:FormsEditComponent},
  {path: 'configuration/forms/fields/fields-new', component:FieldsNewComponent},
  {path: 'configuration/forms/fields/fields-edit', component:FieldsEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
