import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/ui-models/employee.model';
import { EmployeeService } from './employee.service';
import {LiveAnnouncer} from '@angular/cdk/a11y'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['firstName',
                                'lastName',
                                'dateOfBirth',
                                'email',
                                'mobile',
                                'department']
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = "";

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    //Fetching employees
    this.employeeService.getEmployees()
    .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

          this.dataSource.sort = this.matSort;
      }
    );
  }

  filterEmployees() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}