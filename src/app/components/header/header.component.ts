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
	//contents: any;
	userSession: UserSession;
	previousSession: UserSession;
	loggedUser: string;

	constructor(
		private contentSearchService: ContentsearchService,
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe( session => {
			this.userSession = session;
			this.loggedUser = session.loggedUser;
		})
	 }

	ngOnInit() {
	}

	searchForContent() {
		this.contentSearchService.getContentList(this.searchContent).subscribe(data => {
			//this.contents = data;
			if (this.userSession === undefined) {
				this.userSession = new UserSession();
				this.userSession.searchedContents = data;
				this.userSession.contentId = null;
				this.userSession.nextScreen = '<app-home>';
			} else if (this.userSession !== undefined && this.userSession.loggedUser === undefined){
				this.userSession = new UserSession();
				this.userSession.searchedContents = data;
				this.userSession.contentId = null;
				this.userSession.nextScreen = '<app-home>';
			} else {
				this.userSession.searchedContents = data;
				this.userSession.contentId = null;
				this.userSession.nextScreen = '<app-home>';
			}
			this.userSession.didSearch = true;
			
			// this.updateLocalStorage();
			this.changeScreen();
		});
	}

	changeScreen() {
		this.comService.changeScreen(this.userSession);
	}
	
	userLogin() {
		this.userSession = new UserSession();
		this.userSession.nextScreen = '<app-login>';
		this.comService.changeScreen(this.userSession );
	}
	
	register() {
		this.userSession = new UserSession();
		this.userSession.nextScreen = '<app-register>';
		localStorage.removeItem('currentsession');
		this.comService.changeScreen(this.userSession);
	}
	
	userLogoff() {
		this.loggedUser = null;
		//localStorage.removeItem('usersession');
		
		this.userSession = new UserSession();
		this.userSession.enrolledContents= null;
		this.userSession.nextScreen = ('<app-home>');
		this.comService.changeScreen(this.userSession );
		
	}
	myCourses() {
		this.userSession.nextScreen= '<app-enrolcourse>';
		this.comService.changeScreen(this.userSession);
	}

}