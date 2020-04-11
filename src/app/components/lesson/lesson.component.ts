import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { UserSession, LessonContent, TreeData, Children, LessonMission } from '../models/model';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { TreeNode } from 'primeng/api';
import { Router } from '@angular/router';


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
	lessonMission: any[];
	treeNode: TreeNode[];
	treeData: TreeData[];
	url: string;

	constructor(
		//private contentSearchService: ContentsearchService,
		//private comService: CommunicationService,
		private lessonSearch: ContentsearchService,
		//private router: Router
	) {
		this.lessonContents = [];
		this.lessonMission = [];
		this.treeNode = [];
		this.treeData = [];
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
			this.lessonMission = this.lessons.lessonMission;
			this.convertToTreeData();
		});
	}
	openVideo(link: string) {
		this.videoLink = link;
	}


	convertToTreeData() {
		for (let i = 0; i < this.lessonContents.length; i++) {
			const tData = new TreeData();
			tData.children = [];
			tData.label = this.lessonContents[i].lessonTitle;
			if (this.lessonContents[i].subTitle.length > 0) {
				for (let j = 0; j < this.lessonContents[i].subTitle.length; j++) { // inner for
					const child = new Children();
					child.label = this.lessonContents[i].subTitle[j].name;
					child.data = this.lessonContents[i].subTitle[j].lessonLink;
					tData.children.push(child);
				} // end of inner for
			} // end of if statement
			this.treeData.push(tData);
		} // end of first for
		this.converttoTreeNode();
	} // end of converttotreedata

	converttoTreeNode() {
		for (let i = 0; i < this.treeData.length; i++) {
			if (i == 0) {
				this.treeNode.push({
					label: this.treeData[i].label,
					expandedIcon: 'pi-folder-open',
					collapsedIcon: 'pi-folder',
					expanded: true,
					children: this.treeData[i].children
				})
			} else {
				this.treeNode.push({
					label: this.treeData[i].label,
					expandedIcon: 'pi-folder-open',
					collapsedIcon: 'pi-folder',
					expanded: false,
					children: this.treeData[i].children

				})
			}
		}
	}

	nodeSelect(event) {
		this.url = event.node.data;
	}
	
	enrolCourse(){
		
	}


}
