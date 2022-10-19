import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PermissionsItem } from 'src/app/models/PermissionsItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent implements AfterViewInit {

  permissions: PermissionsItem[];
  displayedColumns: string[] = ['Process Name', 'User Name', 'State Name', 'Buttons'];
  dataSource: MatTableDataSource<PermissionsItem>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  
  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
      
      this.permissions = [];
      this.dataSource = new MatTableDataSource<PermissionsItem>(this.permissions);
      
    }

  ngOnInit(): void {
  
    this.backend.getPermissions().subscribe(x => {
      this.permissions = x.data;
      this.dataSource = new MatTableDataSource<PermissionsItem>(this.permissions);
      this.dataSource.paginator = this.paginator!;
    });
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goTo(ruta: string){
    this.router.navigateByUrl('/' + ruta);
  }

  goToEdit(ruta: string, idPermission: number){
    localStorage.setItem('idPermissionEdit', String(idPermission)); 
    this.router.navigateByUrl('/' + ruta);
  }

  delete(idPermission: number) {
  
    this.backend.deletePermission(idPermission).subscribe(x => {
      if (x.status === 0) {
        alert(x.message);
      }
    });
    window.location.reload(); 
  
  }

}
