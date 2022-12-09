import { Component, Inject,  OnInit , ViewChild} from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'User Management App';

  displayedColumns: string[] = ['username', 'lastname', 'id', 'email', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog: MatDialog, private api: ApiService) {}


  ngOnInit(): void {
    this.getAllUsers()
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe((val) => {
      if (val === "save") {
        this.getAllUsers()
      }
    })
  }


  getAllUsers() {
    this.api.getUsers().subscribe((res)=> {
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator,
      this.dataSource.sort = this.sort
    })
  }


  editUser(row:any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe((val) => {
      if (val === "update") {
        this.getAllUsers()
      }
    })
  }


  deleteUser(id:any) {
    this.api.deleteUser(id).subscribe({
      next: () => {
        alert("Deleted Succesfully")
        this.getAllUsers()
      },
      error: () => {
        alert("Error")
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





}
