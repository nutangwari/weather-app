import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CityDetailComponent } from './layout/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: 'weather',
    component: DashboardComponent
  },
  {
    path: 'weather/:cityName',
    component: CityDetailComponent
  },
  {
    path: '',
    redirectTo: '/weather',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
