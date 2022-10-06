import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Department } from 'src/app/models/ui-models/department.model';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from '../employee.service';
import { Subject, Subscriber, Subscription } from 'rxjs';

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
  isNewEmployee = false;
  isSingleView = false;
  isEdit = false;
  header = '';

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    let routePath =''
    if (this.route.snapshot.url.length === 3) {
      routePath = this.route.snapshot.url[1].path.toString();
    }
    this.route.paramMap.subscribe(
      (params) => {
        this.employeeId = params.get('id');

        //fetch a single employee
        if (this.employeeId) {
          //determine which screen to display depending on route
          if(this.employeeId.toLowerCase() === 'Add'.toLowerCase() && !this.isSingleView) {
            //add new employee screen
            this.isNewEmployee = true;
            this.header = 'Add New Employee';
          } else if (routePath === 'View'.toLowerCase() && !this.isNewEmployee) {
            this.isSingleView = true;
            this.header = 'SINGLE VIEW';
            this.employeeService.getSingleEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
              }
            )
          }
          else {
            //editing employee screen

            this.isNewEmployee = false;
            this.isEdit = true;
            this.header = 'Edit Employee';
            this.employeeService.getEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
              }
            );
          }
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
    //calling method from employee service to update employee
    this.employeeService.updateEmployee(this.employee.id, this.employee)
      .subscribe(
        (response) => {
          this.snackbar.open('Employee has been successfully updated', undefined, {
            duration: 5000
          });
        }
      );
      this.router.navigateByUrl('employees');
  }

  onDelete(): void {
    //calling method from employee service to update employee
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Employee has been successfully deleted', undefined, {
            duration: 5000
          })
        }
      );
    this.router.navigateByUrl('employees');
  }

  onAdd(): void {
    this.employeeService.addEmployee(this.employee)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Employee has been successfully added', undefined, {
            duration: 5000
          });

        this.router.navigateByUrl(`employees`);

        }
      );
  }

}
