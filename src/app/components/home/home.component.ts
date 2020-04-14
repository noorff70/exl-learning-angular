import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	searchContent: string;
	contents: any;
	currentSession: UserSession;
	rows: number;
	screenChange: any;
	previousSession: UserSession;

	constructor(
		private comService: CommunicationService,
		private contentSearchService: ContentsearchService
	) {

		comService.userSession$.subscribe(sc => {
			if (sc != null) {
				this.retrieveFromLocalStorage();
			}
		})
	}

	ngOnInit() {
		this.retrieveFromLocalStorage()
	}

	retrieveFromLocalStorage() {
		this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		if (this.currentSession == null) {
			this.getDefaultContents();
		}
		if (this.currentSession != null) {
			this.contents = this.currentSession.searchItem;
			if (this.contents !== undefined) {
				this.rows = this.contents.length / 3;
				if (this.rows % 3 > 0) {
					this.rows++;
				}
			}
			//check for enrolled 
		}// end of if
	}


	selectContent(contentId: any) {
		this.previousSession = JSON.parse(localStorage.getItem('usersession'));

		this.currentSession = new UserSession();
		this.currentSession.contentId = contentId;
		this.currentSession.nextScreen = '<app-lesson>';
		if (this.previousSession.loggedUser != undefined) {
			this.currentSession.loggedUser = this.previousSession.loggedUser;
		}
		if (this.previousSession.enrolledContents != undefined) {
			this.currentSession.enrolledContents = this.previousSession.enrolledContents;
		}
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));
		this.comService.changeScreen(this.currentSession);
	}

	getDefaultContents() {
		this.contentSearchService.getContentList('java').subscribe(data => {
			this.contents = data;
			this.updateLocalStorage();
			//this.changeScreen();
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
}