import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  newtodos: Todo[] = [];
  @Input() todo: Todo = new Todo();
  @Output() valueChange = new EventEmitter<string>();

  constructor(
    private todoService: TodoService,
  ){}

  // 初期動作
  ngOnInit(): void {
    // todo.service.tsのgetAllTodoで全てのTodoを取得し、表示する
    this.todoService.getAllTodo().subscribe(todos => this.todos = todos)
  }

  // 保存ボタンを押した時の挙動
  save(): void {
    this.todoService
      .create(this.todo)
      .subscribe(data => this.getNewTodo())
    this.todo = new Todo();
  }

  // 最新の一件を呼び出す挙動
  getNewTodo(): void {
    this.todoService
      .getNewTodo()
      .subscribe(res => {this.pushData(res)})
  }

  // htmlに渡すnewtodosにデータをpushする
  pushData(data: Todo): void {
    this.newtodos.unshift(data);
  }
}