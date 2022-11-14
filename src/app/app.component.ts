import { Component } from '@angular/core';
import { ProfileData } from './models/profileData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mpso';

  profileData: ProfileData[] = [];
  selectedProfile!: ProfileData;
  showDataInsertDialog: boolean = false;

  click(){
    this.showDataInsertDialog = true;
  }

  getProfileData(event: ProfileData) {
    this.profileData.push(event);
    this.showDataInsertDialog = false;

    this.setDefaultProfile();    
  }

  setDefaultProfile(){
    if(this.profileData.length === 1) {
      this.selectedProfile = this.profileData[0];
    }
  }
}
