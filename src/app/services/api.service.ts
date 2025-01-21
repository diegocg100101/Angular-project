import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL para realizar la petición GET
  private urlGet = 'https://jsonplaceholder.typicode.com/users';

  // URL para realizar la petición POST
  private urlPost = 'http://httpbin.org/post';

  constructor(private http: HttpClient) { }

  // Método para consumir el API con el método GET
  public getUsers(): Observable<any> {
    return this.http.get<any>(this.urlGet);
  }

  // Método para enviar la petición POST
  public postData(data: any): Observable<any> {
    return this.http.post(this.urlPost, data);
  }
}
