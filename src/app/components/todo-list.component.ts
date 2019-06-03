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
  @Input() todo: Todo = new Todo();

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
      .subscribe(data => {
        this.todos.push(data)
        this.todos.sort((a, b) => b.id - a.id) // 最新を上にする
      })
    this.todo = new Todo(); // input初期化
  }

  // 削除ボタンを押した時の挙動
  delete(id: number): void {
    this.todoService
      .delete(id)
      .subscribe(() => this.popDataId(id))
  }

  // todoを更新した時の挙動
  update(id: number, title: string): void {
    let todo = {
      id: id,
      title: title
    }
    this.todoService
      .update(todo)
      .subscribe(newTodo => {
        const todoIndex = this.todos.findIndex((element) => element.id === id)
        this.todos[todoIndex] = newTodo
      })
  }

  // 最新の一件を呼び出す挙動
  /*getNewTodo(): void {
    this.todoService
      .getNewTodo()
      .subscribe(res => {this.pushData(res)})
  }

  // htmlに渡すtodosにデータをpushする
  pushData(data: Todo): void { 
    this.todos = this.todos.concat(data)
  }*/

  // HTML要素を消す
  popDataId(id: number): void {
    this.todos = this.todos
      .filter((element, index, array) => {
        return element.id != id
      })
  }
}