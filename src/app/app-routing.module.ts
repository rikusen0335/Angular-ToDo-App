import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './components/todo-list.component';
import { IndexComponent } from './index/index.component'

const routes: Routes = [
  { path: '', component: TodoListComponent }, // http://localhost:4200/ に接続すると、todo-list.component.tsを表示する
  { path: 'index', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
