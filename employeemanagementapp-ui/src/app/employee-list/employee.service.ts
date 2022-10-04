import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/api-models/employee.model';

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

  //GET /employee/:id
  getEmployee(employeeId: string): Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseUrl + '/employees/' + employeeId);
  }
}
