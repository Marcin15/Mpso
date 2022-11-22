import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { BasicInformationDialogComponent } from './components/dialogs/basic-information-dialog/basic-information-dialog.component';
import { DataInsertDialogComponent } from './components/dialogs/data-edit-dialog/data-edit-dialog.component';
import { DataManagerDialogComponent } from './components/dialogs/data-manager-dialog/data-manager-dialog.component';
import { DataManagerItemComponent } from './components/dialogs/data-manager-dialog/data-manager-item/data-manager-item.component';
import { TabulatedDataComponent } from './components/tabulated-data/tabulated-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DataManagerDialogComponent,
    DataInsertDialogComponent,
    BasicInformationDialogComponent,
    DataManagerItemComponent,
    TabulatedDataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
