import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SwitchLangComponent } from './components/switch-lang/switch-lang.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, SearchComponent, EditModeComponent, ToolbarComponent, SwitchLangComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
