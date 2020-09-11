import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { Student, UserSession } from '../models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

	registerForm: FormGroup;
	submitted = false;

	constructor(private comService: CommunicationService,
		private userAccesService: ContentsearchService,
		private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.errorMsg = [];
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		} else {
			this.student = new Student();
			this.student.password = this.registerForm.value.password;
			this.student.userName = this.registerForm.value.username;

			this.userAccesService.userLogin(this.student).subscribe(data => {
				this.contents = data;
				if (this.contents != null) {
					
					this.currentSession = new UserSession();
					this.currentSession.nextScreen = '<app-enrolcourse>';
					this.comService.changeScreen(this.currentSession);
					
					//this.updateLocalStorage();
					this.onReset();
				} else {
					this.onReset();
				}
			})
		}

		// display form values on success
		// alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}

	registerUser() {
		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-register>';
		this.comService.changeScreen(this.currentSession);
	}

	/*userLogin() {

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
		
	}*/

	updateLocalStorage() {

		localStorage.removeItem('usersession');

		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-home>';
		this.currentSession.searchItem = this.contents;
		this.currentSession.enrolledContents = this.contents;
		this.currentSession.loggedUser = this.username;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));

		this.comService.changeScreen(this.currentSession);
	}

	/*clearText() {
		this.username = '';
		this.password = '';
	}*/

	/*validateUser() {
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
	}*/

}
