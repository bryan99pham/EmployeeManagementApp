import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/api-models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'https://localhost:44383'

  constructor(private httpClient: HttpClient) { }

  getDepartmentList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.baseUrl + '/departments');
  }
}
