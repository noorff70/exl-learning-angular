import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { Student, UserSession } from '../models/model';
import { CommunicationService } from 'src/app/services/common/communication.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	fName: string;
	lName: string;
	password1: string;
	password2: string;
	userName: string;
	email: string;
	student: Student;
	registerReturned: any;
	currentSession: UserSession;

	constructor(
		private userAccesService: ContentsearchService,
		private comService: CommunicationService
	) { 
	}

	ngOnInit() {
	}
	
	userRegister() {

		this.student = new Student();	
		this.student.password = this.password1;
		this.student.studentFName = this.fName;
		this.student.studentLName = this.lName;
		this.student.userName = this.userName;
		this.student.studentEmail = this.email;
		
		this.userAccesService.registerNewUser(this.student).subscribe(stu =>{
			this.registerReturned = stu;
			if (this.registerReturned.registerSuccess == true) {
				this.updateLocalStorage();
				this.clearText();
			}
		}) 
		
	}
	
	updateLocalStorage() {
		
		localStorage.removeItem('usersession');
		
		this.currentSession = new UserSession();

		//this.currentSession.currentScreen = '<app-header>';
		this.currentSession.nextScreen = '<app-home>';
		//this.currentSession.searchItem = this.contents;
		this.currentSession.loggedUser = this.userName;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));
		
		this.comService.changeScreen(this.currentSession);
	}
	
	clearText() {
				
		this.fName = '';
		this.lName = '';
		this.password1 = '';
		this.password2 = '';
		this.userName = '';
		this.email = '';
	}

}
