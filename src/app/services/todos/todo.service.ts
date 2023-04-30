import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Todo } from 'src/app/interfaces/Todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl: string = environment.apiUrl
  
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  putTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo);
  }
}
