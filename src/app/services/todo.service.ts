import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators';

import { Todo } from '../models/models';
import { Observable } from 'rxjs';


@Injectable()
export class TodoService {
  todo: Todo[] = [];
  private Url = `http://127.0.0.1:8000/api/todo`
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private body = JSON.stringify(this.todo)

  constructor(
    private http: HttpClient
  ){}

  // 全てのtodoをGETする
  getAllTodo() {
    return this.http.get(this.Url)
      .pipe(
        map(res => res as Todo[]),
        catchError(this.handleError)
      )
  }

  // 追加時の挙動
  create(todo: Todo) {
    return this.http.post(this.Url, this.body, {headers: this.headers})
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  // 追加された最新のtodoを一件取得する
  getNewTodo() {
    return this.http.get(this.Url + "?limit=1")
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  // 更新時の挙動
  update(todo: Todo){
    const url = `${this.Url}${todo.id}/`;
    return this.http.put(url, this.body, {headers: this.headers})
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  // 削除時の挙動
  delete(id: number): Observable<void> {
    const url = `${this.Url}${id}/`;
    return this.http.delete(url, {headers: this.headers})
      .pipe(
        map(() => null),
        catchError(this.handleError)
      )
  }


  // エラーハンドリング
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}