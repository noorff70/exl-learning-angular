import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserSession} from 'src/app/components/models/model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

	userSession = new Subject<UserSession>();
	userSession$ = this.userSession.asObservable();

	content = new Subject<any>();
	content$ = this.content.asObservable();

  constructor() { }

  changeScreen(sc: UserSession ) {
	this.userSession.next(sc);
  }

  changeContent(id: any) {
	this.content.next(id);
   }
}
