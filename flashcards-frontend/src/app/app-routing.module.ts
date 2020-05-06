import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import { ErrorComponent } from './components/error/error.component';
import { ViewEditModeComponent } from './components/view-edit-mode/view-edit-mode.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'switch-lang', component: SwitchLangComponent },
	{ path: 'view-edit-mode', component: ViewEditModeComponent },
	{ path: '',   redirectTo: '/search', pathMatch: 'full' },
	{ path: '**', component: ErrorComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
