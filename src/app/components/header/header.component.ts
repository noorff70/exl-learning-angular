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

	constructor(
		private contentSearchService: ContentsearchService,
		private comService: CommunicationService
	) { }

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
		this.currentSession = new UserSession();

		this.currentSession.currentScreen = '<app-header>';
		this.currentSession.nextScreen = '<app-home>';
		this.currentSession.searchItem = this.contents;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));
	}

	changeScreen() {
		this.comService.changeScreen(this.currentSession);
	}
	
	userLogin() {

	}
	
	register() {
		this.currentSession = new UserSession();

		//this.currentSession.currentScreen = '<app-header>';
		this.currentSession.nextScreen = '<app-register>';
		//this.currentSession.searchItem = this.contents;
		localStorage.removeItem('currentsession');
		//localStorage.setItem('usersession', JSON.stringify(this.currentSession));
		this.comService.changeScreen(this.currentSession);
	}

}