import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';
import { TableViewComponent } from './pages/table-view/table-view.component';
import { FormComponent } from './pages/form/form.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'to-do', component: ToDoListComponent },
  { path: 'table-view', component: TableViewComponent },
  { path: 'subscribe', component: FormComponent},
  { path: 'detailed-view', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
