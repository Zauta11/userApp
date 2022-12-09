import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postUser(data: any):Observable<any> {
    return this.http.post<any>("http://localhost:3000/posts/", data)
  }

  getUsers():Observable<any> {
    return this.http.get("http://localhost:3000/posts/")
  }

  editUser(data:any, id: number):Observable<any> {
    return this.http.put("http://localhost:3000/posts/"+id, data)
  }

  deleteUser(id:number):Observable<any> {
    return this.http.delete("http://localhost:3000/posts/" +id)
  }
}
