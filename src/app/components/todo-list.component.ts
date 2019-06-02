import { Component, Input } from '@angular/core';

import { catchError, map } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import { Todo } from '../models/models';

@Component({
  selector: 'todo-list',
  templateUrl: '../templates/todo-list.component.html', // templatesからtemplateを読み込む
  styleUrls: ['../static/todo-list.component.css'] // staticからスタイルシートを読み込む
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
  ){}
  ngOnInit(): void {
    // todo.service.tsのgetAllTodoで全てのTodoを取得し、表示する
    console.log('ngOnInit');
    this.todoService.getAllTodo()
    .pipe(
      map(todos => this.todos = todos)
      
    )
    
  }
}