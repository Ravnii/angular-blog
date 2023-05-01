import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todos/todo.service';
import { Todo } from 'src/app/interfaces/Todo';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  todo: Todo[] = [];
  done: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      todos.forEach(todo => {
        if (todo.done === false) {
          this.todo.push(todo);
        } else {
          this.done.push(todo);
        }
      })
    });
  }

  drop(event: CdkDragDrop<Todo[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

          event.container.data[event.currentIndex].done = !event.container.data[event.currentIndex].done;
          
          this.todoService.putTodo(event.container.data[event.currentIndex]).subscribe((todo) => { console.log(todo)});
    }
  }
}
