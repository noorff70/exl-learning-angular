import { Component, OnInit } from '@angular/core';
// import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
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
		private comService: CommunicationService
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
		if (this.currentSession != null) {
			this.contents = this.currentSession.searchItem;
			if (this.contents !== undefined) {
				this.rows = this.contents.length / 3;
				if (this.rows % 3 > 0) {
					this.rows++;
				}
			}
		}
	}


	selectContent(contentId: any) {
		this.previousSession = JSON.parse(localStorage.getItem('usersession'));
		
		this.currentSession = new UserSession();
		this.currentSession.contentId = contentId;
		this.currentSession.nextScreen = '<app-lesson>';
		if (this.previousSession.loggedUser != undefined) {
			this.currentSession.loggedUser = this.previousSession.loggedUser;
		}
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));
		this.comService.changeScreen(this.currentSession);
	}
}