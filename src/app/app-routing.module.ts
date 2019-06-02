import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent }    from './components/todo-list.component';

const routes: Routes = [
  { path: '', component: TodoListComponent }, // http://localhost:4200/ に接続すると、todo-list.component.tsを表示する
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
