import { Component, OnInit } from '@angular/core';
import { UserSession } from '../models/model';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { CommunicationService } from 'src/app/services/common/communication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	searchContent: string;
	contents: any;
	currentSession: UserSession;
	previousSession: UserSession;
	loggedUser: string;

	constructor(
		private contentSearchService: ContentsearchService,
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe( session => {
			this.loggedUser = session.loggedUser;
		})
	 }

	ngOnInit() {
	}

	searchForContent() {
		this.contentSearchService.getContentList(this.searchContent).subscribe(data => {
			this.contents = data;
			this.updateLocalStorage();
			this.changeScreen();
		});
	}

	updateLocalStorage() {
		this.previousSession = JSON.parse(localStorage.getItem('usersession'));
		
		this.currentSession = new UserSession();
		if (this.previousSession != null) {
			this.currentSession.loggedUser = this.previousSession.loggedUser
		}
		if (this.previousSession != undefined && this.previousSession.enrolledContents != undefined) {
			this.currentSession.enrolledContents = this.previousSession.enrolledContents
		}

		this.currentSession.currentScreen = '<app-header>';
		this.currentSession.nextScreen = '<app-home>';
		this.currentSession.searchItem = this.contents;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));
	}

	changeScreen() {
		this.comService.changeScreen(this.currentSession);
	}
	
	userLogin() {
		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-login>';
		this.comService.changeScreen(this.currentSession );
	}
	
	register() {
		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-register>';
		localStorage.removeItem('currentsession');
		this.comService.changeScreen(this.currentSession);
	}
	
	userLogoff() {
		this.loggedUser = null;
		localStorage.removeItem('usersession');
		
		this.currentSession = new UserSession();
		this.currentSession.enrolledContents= null;
		this.currentSession.nextScreen = ('<app-home>');
		this.comService.changeScreen(this.currentSession );
		
	}

}