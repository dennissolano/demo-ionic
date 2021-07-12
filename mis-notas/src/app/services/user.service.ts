import {EventEmitter, Injectable} from '@angular/core';
import {UserData} from '../types/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userStatusChange: any = new EventEmitter<any>();
  public isLoggedIn = false;

  constructor() {}

  performLogin(user: string, password: string): UserData {
    if (user === 'user@test.com' && password === '123456') {
      this.isLoggedIn = true;
      const userData: UserData = {
        id: 1,
        email: 'user@test.com',
        firstName: 'Juan',
        lastName: 'Vainas',
        avatar: 'https://picsum.photos/200'
      };
      this.userStatusChange.emit(userData);
      return userData;
    } else {
      return null;
    }
  }

  performLogout(): void {
    this.isLoggedIn = false;
    this.userStatusChange.emit(null);
  }
}
