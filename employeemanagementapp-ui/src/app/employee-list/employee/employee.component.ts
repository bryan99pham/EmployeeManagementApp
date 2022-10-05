import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/ui-models/department.model';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeId: string | null | undefined;
  employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    departmentId: '',
    profileImageURL: '',
    department: {
      departmentId: '',
      departmentName: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  departmentList: Department[] = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        //uses id from url in routing module
        this.employeeId = params.get('id');

        //fetch a single employee
        if (this.employeeId) {
          this.employeeService.getEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
              }
            );
          this.departmentService.getDepartmentList()
            .subscribe(
              (response) => {
                this.departmentList = response;
              }
            )
        }
      }
    );
  }

  onUpdate(): void {
    console.log(this.employee);
    //calling method from employee service to update employee
    this.employeeService.updateEmployee(this.employee.id, this.employee)
      .subscribe(
        (response) => {
          this.snackbar.open('Employee has been successfully updated', undefined, {
            duration: 5000
          });
        }
      );
  }

}
