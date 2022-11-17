import { Component, OnInit } from '@angular/core';
import { ProfileData } from './models/profileData';
import { LocalStorageRepositoryService } from './services/local-storage-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  profileData: ProfileData[] = [];
  selectedProfile!: ProfileData;
  showDataInsertDialog: boolean = false;
  showDataManagerDialog: boolean = false;

  constructor(private localStorageRepo: LocalStorageRepositoryService) {
    
  }

  ngOnInit(): void {
    var localStorageResult = this.localStorageRepo.getFromLocalStorage();

    if(localStorageResult) {
      this.profileData = localStorageResult as ProfileData[];
      this.setDefaultProfile();
    }
  }

  click(){
    this.showDataInsertDialog = true;
  }

  getProfileData(event: ProfileData) {
    
    this.profileData.push(event);
    this.showDataInsertDialog = false;

    this.setDefaultProfile();

    this.localStorageRepo.updateLocalStorage(this.profileData);
  }

  setDefaultProfile(){
    if(this.profileData.length === 1) {
      this.selectedProfile = this.profileData[0];
    }
  }
}
