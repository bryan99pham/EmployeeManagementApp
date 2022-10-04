import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeId: string | null | undefined;

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
              (success) => {
                console.log(success);
              }
            );
        }
      }
    );
  }

}
