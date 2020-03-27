import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { UserSession, LessonContent } from '../models/model';
import { CommunicationService } from 'src/app/services/common/communication.service';

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
		private contentSearchService: ContentsearchService,
		private comService: CommunicationService,
		private lessonSearch: ContentsearchService
	) {
		this.lessonContents = [];

	}

	ngOnInit() {

		this.loadContentIdFmLocalStorage();
		this.getLessons();
	}

	loadContentIdFmLocalStorage() {
		this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		this.contentId = this.currentSession.contentId;
		console.log('contentId is ' + this.contentId);
	}

	getLessons() {
		this.lessonSearch.getLessonByContentId(this.contentId).subscribe(data => {
			this.lessons = data;
			this.lessonContents = this.lessons.lessonContent;
		});
	}
	openVideo(link: string) {
		this.videoLink = link;
	}

}
