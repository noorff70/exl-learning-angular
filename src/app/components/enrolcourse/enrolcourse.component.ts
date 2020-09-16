import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';

@Component({
	selector: 'app-enrolcourse',
	templateUrl: './enrolcourse.component.html',
	styleUrls: ['./enrolcourse.component.css']
})
export class EnrolcourseComponent implements OnInit {

	loggedUser: string;
	userSession: UserSession = new UserSession;
	contents: any;
	rows: number;
	currentSession: UserSession;
	enrolledStatus: boolean = false;
	enrolledContents: any;

	constructor(
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe(session => {
			this.loggedUser = session.loggedUser;
			this.userSession.enrolledContents = session.enrolledContents;
			this.enrolledStatus = session.enrolledStatus;
			this.enrolledContents = session.enrolledContents;
		})
	}

	ngOnInit() {
		this.displayContents();
	}

	displayContents() {
		this.contents = this.userSession.enrolledContents;
		if (this.contents !== undefined) {
			this.rows = this.contents.length / 3;
			if (this.rows % 3 > 0) {
				this.rows++;
			}
		}
	}

	selectContent(contentId: any) {
			//this.previousSession = JSON.parse(localStorage.getItem('usersession'));
	
			this.currentSession = new UserSession();
			this.currentSession.contentId = contentId;
			this.currentSession.enrolledStatus = this.enrolledStatus;
			this.currentSession.enrolledContents = this.enrolledContents;
			this.currentSession.loggedUser = this.loggedUser;
			this.currentSession.nextScreen = '<app-lesson>';
			//if (this.previousSession.loggedUser != undefined) {
			//	this.currentSession.loggedUser = this.previousSession.loggedUser;
			//}
			//if (this.previousSession.enrolledContents != undefined) {
			//	this.currentSession.enrolledContents = this.previousSession.enrolledContents;
			this.currentSession.enrolledContents = this.contents;
			//}
			//localStorage.setItem('usersession', JSON.stringify(this.currentSession));
			this.comService.changeScreen(this.currentSession); 
	}

}
