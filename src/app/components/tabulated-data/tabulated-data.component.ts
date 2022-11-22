import { Component, Input, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';
import { TabulatedData } from 'src/app/models/tabulatedData';
import { DynamicMeasuresCalculatorService } from 'src/app/services/dynamic-measures-calculator.service';

@Component({
    selector: 'app-tabulated-data[profileData]',
    templateUrl: './tabulated-data.component.html',
    styleUrls: ['./tabulated-data.component.scss'],
})
export class TabulatedDataComponent implements OnInit {
    @Input() profileData!: ProfileData;

    private _absuluteIncrease_t0!: Array<number | null>;
    private _absuluteIncrease_t1!: Array<number | null>;
    private _relativeIncrease_t0!: Array<number | null>;
    private _relativeIncrease_t1!: Array<number | null>;
    private _fixedBaseIndex!: Array<number | null>;
    private _chainBaseIndex!: Array<number | null>;

    tableData: TabulatedData[] = [];

    constructor(
        private dynamicMesasuresCalculator: DynamicMeasuresCalculatorService
    ) {}

    ngOnInit(): void {
      this.calculateDymanicMeasures();
      this.createTableData();   
    }

    createTableData() {
      for (let i = 0; i < this.profileData.values.length; i++) {
        this.tableData.push({
          baseValue: this.profileData.values[i],
          absuluteIncrease_t0: this._absuluteIncrease_t0[i],
          absuluteIncrease_t1: this._absuluteIncrease_t1[i],
          relativeIncrease_t0: this._relativeIncrease_t0[i],
          relativeIncrease_t1: this._relativeIncrease_t1[i],
          fixedBaseIndex: this._fixedBaseIndex[i],
          chainBaseIndex: this._chainBaseIndex[i]
        })
      }
    }

    private calculateDymanicMeasures() {
        this._absuluteIncrease_t0 =
            this.dynamicMesasuresCalculator.absuluteIncrease_t0(
                this.profileData.values
            );
        this._absuluteIncrease_t1 =
            this.dynamicMesasuresCalculator.absuluteIncrease_t1(
                this.profileData.values
            );
        this._relativeIncrease_t0 =
            this.dynamicMesasuresCalculator.relativeIncrease_t0(
                this._absuluteIncrease_t0,
                this.profileData.values[0]
            );
        this._relativeIncrease_t1 =
            this.dynamicMesasuresCalculator.relativeIncrease_t1(
                this._absuluteIncrease_t1,
                this.profileData.values[0]
            );
        this._fixedBaseIndex = this.dynamicMesasuresCalculator.fixedBaseIndex(
            this.profileData.values
        );
        this._chainBaseIndex = this.dynamicMesasuresCalculator.chainBaseIndex(
            this.profileData.values
        );
    }
}
