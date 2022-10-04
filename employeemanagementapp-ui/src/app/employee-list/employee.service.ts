import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/api-models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //setting the url to fetch employees
  private baseUrl = 'https://localhost:44383';

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.httpClient.get<Employee[]>(this.baseUrl + '/employees');
  }
}
