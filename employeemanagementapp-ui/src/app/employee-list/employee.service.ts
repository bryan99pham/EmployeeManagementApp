import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployeeRequest } from '../models/api-models/add-employee-request.model';
import { Employee } from '../models/api-models/employee.model';
import { UpdateEmployeeRequest } from '../models/api-models/update-employee-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //setting the url to fetch to
  private baseUrl = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) { }

  //GET /employees
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl + '/employees');
  }

  //GET /employeea/id
  getEmployee(employeeId: string): Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseUrl + '/employees/' + employeeId);
  }

  //GET /employees
  getSingleEmployee(employeeId: string): Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseUrl + '/employees/' + 'view/' + employeeId);
  }

  //PUT /employees/id
  updateEmployee(employeeId: string, employeeRequest: Employee): Observable<Employee> {
    const updateEmployeeRequest: UpdateEmployeeRequest = {
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      dateOfBirth: employeeRequest.dateOfBirth,
      email: employeeRequest.email,
      mobile: employeeRequest.mobile,
      departmentId: employeeRequest.departmentId,
      physicalAddress: employeeRequest.address.physicalAddress,
      postalAddress: employeeRequest.address.postalAddress
    }
    return this.httpClient.put<Employee>(this.baseUrl + '/employees/' + employeeId, updateEmployeeRequest);
  }

  //DELETE /employees/id
  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(this.baseUrl + '/employees/' + employeeId);
  }

  //POST /employees/add
  addEmployee(employeeRequest: Employee): Observable<Employee> {
    const addEmployeeRequest: AddEmployeeRequest = {
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      dateOfBirth: employeeRequest.dateOfBirth,
      email: employeeRequest.email,
      mobile: employeeRequest.mobile,
      departmentId: employeeRequest.departmentId,
      physicalAddress: employeeRequest.address.physicalAddress,
      postalAddress: employeeRequest.address.postalAddress
    };

    return this.httpClient.post<Employee>(this.baseUrl + '/employees/add', addEmployeeRequest);
  }
}
