import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DataInsertComponent } from './components/data-insert/data-insert.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DataInsertComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
