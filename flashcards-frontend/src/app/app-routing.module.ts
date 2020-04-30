import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { SearchComponent } from './components/search/search.component';
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'switch-lang', component: SwitchLangComponent },
	{ path: 'edit-mode', component: EditModeComponent },
	{ path: '',   redirectTo: '/search', pathMatch: 'full' },
	{ path: '**', component: ErrorComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
