import { Injectable } from '@angular/core';
import { ProfileData } from '../models/profileData';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryService {

  constructor() { }

  updateLocalStorage(userData: ProfileData[]) {
    this.removeFromLocalStorage();
    window.localStorage.setItem('user-data', this.serializeObject(userData));
  }

  
  getFromLocalStorage() {
    let json = window.localStorage.getItem('user-data');
    
    return this.deserializeObject(json);
  }
  
  private removeFromLocalStorage() {
    window.localStorage.removeItem('user-data');
  }
  
  private serializeObject(userData: ProfileData[]): string {
    return JSON.stringify(userData);
  }

  private deserializeObject(json: string | null): ProfileData[] | null {
    if(!json)
      return null;

    return JSON.parse(json);
  }
}
