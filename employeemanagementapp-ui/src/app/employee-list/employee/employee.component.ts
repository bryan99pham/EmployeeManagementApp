import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/ui-models/employee.model';
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

  constructor(private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        //uses id from url in routing module
        this.employeeId = params.get('id');

        if (this.employeeId) {
          this.employeeService.getEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
              }
            );
        }
      }
    );
  }

}
