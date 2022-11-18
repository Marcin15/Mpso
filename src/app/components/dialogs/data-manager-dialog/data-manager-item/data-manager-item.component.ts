import { Component, Input, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-data-manager-item[profileData]',
  templateUrl: './data-manager-item.component.html',
  styleUrls: ['./data-manager-item.component.scss']
})
export class DataManagerItemComponent implements OnInit {

  @Input() profileData!: ProfileData;

  constructor() { }

  ngOnInit(): void {
  }

}
