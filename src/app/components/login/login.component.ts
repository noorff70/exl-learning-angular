import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { Student, UserSession } from '../models/model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username: string;
	password: string;
	contents: any;
	student: Student;
	currentSession: UserSession;
	errorMsg: string[];

	constructor(private comService: CommunicationService,
		private userAccesService: ContentsearchService) {
	}

	ngOnInit() {
		this.errorMsg = [];
	}

	userLogin() {

		if (this.validateUser()) {
			this.student = new Student();
			this.student.userName = this.username;
			this.student.password = this.password;

			this.userAccesService.userLogin(this.student).subscribe(data => {
				this.contents = data;
				if (this.contents != null) {
					this.updateLocalStorage();
					this.clearText();
				}
			})
		} else {
			this.clearText();
			//this.errorMsg = [];
		}
		
	}

	updateLocalStorage() {

		localStorage.removeItem('usersession');

		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-home>';
		this.currentSession.searchItem = this.contents;
		this.currentSession.loggedUser = this.username;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));

		this.comService.changeScreen(this.currentSession);
	}

	clearText() {
		this.username = '';
		this.password = '';
	}

	validateUser() {
		if (this.username == undefined) {
			this.errorMsg.push('User name is empty');
		}
		if (this.password == undefined) {
			this.errorMsg.push('Password is empty');
		}

		if (this.errorMsg.length == 0) {
			return true;
		} else {
			return false;
		}
	}

}
