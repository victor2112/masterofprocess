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
import { ListsListComponent } from './components/configuration/lists/lists-list/lists-list.component';
import { ListsNewComponent } from './components/configuration/lists/lists-new/lists-new.component';
import { ListsEditComponent } from './components/configuration/lists/lists-edit/lists-edit.component';
import { ValuesNewComponent } from './components/configuration/lists/values/values-new/values-new.component';
import { ValuesEditComponent } from './components/configuration/lists/values/values-edit/values-edit.component';
import { ProcessesEditComponent } from './components/configuration/processes/processes-edit/processes-edit.component';
import { ProcessesListComponent } from './components/configuration/processes/processes-list/processes-list.component';
import { ProcessesNewComponent } from './components/configuration/processes/processes-new/processes-new.component';
import { StatesNewComponent } from './components/configuration/states/states-new/states-new.component';
import { StatesEditComponent } from './components/configuration/states/states-edit/states-edit.component';
import { StatesListComponent } from './components/configuration/states/states-list/states-list.component';
import { TransitionsListComponent } from './components/configuration/transitions/transitions-list/transitions-list.component';
import { TransitionsNewComponent } from './components/configuration/transitions/transitions-new/transitions-new.component';
import { TransitionsEditComponent } from './components/configuration/transitions/transitions-edit/transitions-edit.component';
import { PermissionsEditComponent } from './components/configuration/permissions/permissions-edit/permissions-edit.component';
import { PermissionsListComponent } from './components/configuration/permissions/permissions-list/permissions-list.component';
import { PermissionsNewComponent } from './components/configuration/permissions/permissions-new/permissions-new.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { TrackChangesComponent } from './components/track-changes/track-changes.component';

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
  {path: 'configuration/forms/fields/fields-edit', component:FieldsEditComponent},
  {path: 'configuration/lists/lists-list', component:ListsListComponent},
  {path: 'configuration/lists/lists-new', component:ListsNewComponent},
  {path: 'configuration/lists/lists-edit', component:ListsEditComponent},
  {path: 'configuration/lists/values/values-new', component:ValuesNewComponent},
  {path: 'configuration/lists/values/values-edit', component:ValuesEditComponent},
  {path: 'configuration/processes/processes-list', component:ProcessesListComponent},
  {path: 'configuration/processes/processes-new', component:ProcessesNewComponent},
  {path: 'configuration/processes/processes-edit', component:ProcessesEditComponent},
  {path: 'configuration/states/states-list', component:StatesListComponent},
  {path: 'configuration/states/states-edit', component:StatesEditComponent},
  {path: 'configuration/states/states-new', component:StatesNewComponent},
  {path: 'configuration/transitions/transitions-list', component:TransitionsListComponent},
  {path: 'configuration/transitions/transitions-edit', component:TransitionsEditComponent},
  {path: 'configuration/transitions/transitions-new', component:TransitionsNewComponent},
  {path: 'configuration/permissions/permissions-list', component:PermissionsListComponent},
  {path: 'configuration/permissions/permissions-edit', component:PermissionsEditComponent},
  {path: 'configuration/permissions/permissions-new', component:PermissionsNewComponent},
  {path: 'graficas', component:GraficasComponent},
  {path: 'trackChanges', component:TrackChangesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
