import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { UserSession, LessonContent } from '../models/model';

@Component({
	selector: 'app-lesson',
	templateUrl: './lesson.component.html',
	styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

	contentId: any;
	lessons: any;
	currentSession: UserSession;
	videoLink: string;
	lessonContents: LessonContent[];

	constructor(
		private lessonSearch: ContentsearchService
	) {
		this.lessonContents = [];

	}

	ngOnInit() {

		this.loadContentIdFmLocalStorage();
		this.getLessons();
		//this.createToggle();
	}

	loadContentIdFmLocalStorage() {
		this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		this.contentId = this.currentSession.contentId;
	}

	getLessons() {
		this.lessonSearch.getLessonByContentId(this.contentId).subscribe(data => {
			this.lessons = data;
			this.lessonContents = this.lessons.lessonContent;
			console.log(data);
		});
	}
	openVideo(link: string) {
		this.videoLink = link;
	}

	/*createToggle() {

		const toggler = document.getElementsByClassName('caret');
		console.log('Toggler length: ' + toggler.length);

		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < 4; i++) {
			toggler[i].addEventListener('click', function () {
				this.parentElement.querySelector('.nested').classList.toggle('active');
				this.classList.toggle('caret-down');
			});
		}

	}*/

}
