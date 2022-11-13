import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DataManagerDialogComponent } from './components/dialogs/data-manager-dialog/data-manager-dialog.component';
import { DataInsertDialogComponent } from './components/dialogs/data-insert-dialog/data-insert-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DataManagerDialogComponent,
    DataInsertDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
