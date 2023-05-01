import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Todo } from 'src/app/interfaces/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl: string = 'api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  putTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl, todo);
  }
}
