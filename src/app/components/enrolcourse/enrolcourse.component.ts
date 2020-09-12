import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';

@Component({
	selector: 'app-enrolcourse',
	templateUrl: './enrolcourse.component.html',
	styleUrls: ['./enrolcourse.component.css']
})
export class EnrolcourseComponent implements OnInit {

	loggedUser: string;

	constructor(
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe(session => {
			this.loggedUser = session.loggedUser;
		})
	}

	ngOnInit() {

	}

}
