import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-data-manager-item[profileData]',
  templateUrl: './data-manager-item.component.html',
  styleUrls: ['./data-manager-item.component.scss']
})
export class DataManagerItemComponent implements OnInit {

  @Input() profileData!: ProfileData;
  @Output() remove = new EventEmitter<ProfileData>();
  @Output() edit = new EventEmitter<ProfileData>();

  constructor() { }

  ngOnInit(): void {
  }

  editButtonClick() {
    this.edit.emit(this.profileData);
  }
  
  removeButtonClick() {
    this.remove.emit(this.profileData);
  }

}
