import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { UserSession, LessonContent, TreeData, Children } from '../models/model';
import { TreeNode } from 'primeng/api';
//import { DialogModule} from 'primeng/primeng';
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
	lessonMission: any[];
	treeNode: TreeNode[];
	treeData: TreeData[];
	url: string;
	insertSuccess: any;
	enrollButton: boolean;
	showDialog: boolean;
	dialogValue: string;

	constructor(
		private comService: CommunicationService,
		private contentService: ContentsearchService,
		//private router: Router
	) {
		this.lessonContents = [];
		this.lessonMission = [];
		this.treeNode = [];
		this.treeData = [];
		this.enrollButton = true;
	}

	ngOnInit() {
		this.loadContentIdFmLocalStorage();
		this.getLessons();
	}

	loadContentIdFmLocalStorage() {
		this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		this.contentId = this.currentSession.contentId;
		this.comService.changeScreen(this.currentSession);
		this.enableDisableEnrolButton();
	}
	
	enableDisableEnrolButton() {
		if (this.currentSession.enrolledContents != undefined) {
			for (let i=0; i< this.currentSession.enrolledContents.length; i++) {
				if(this.currentSession.contentId == this.currentSession.enrolledContents[i].contentId) {
					this.enrollButton = false;
				}
			}
		}
	}

	getLessons() {
		this.contentService.getLessonByContentId(this.contentId).subscribe(data => {
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
					if (this.lessonContents[i].subTitle[j].lessonType == "0") {
						child.label = this.lessonContents[i].subTitle[j].name;
						if (this.currentSession.loggedUser == null) {
							child.data = undefined;
						} else {
							child.data = this.lessonContents[i].subTitle[j].lessonLink;
							child.icon = 'pi pi-play';
						}
						// child.icon = 'pi pi-play';
					}
					 else {
						child.label = this.lessonContents[i].subTitle[j].name;
						child.data = this.lessonContents[i].subTitle[j].lessonLink;
						child.icon = 'pi pi-play';
					}
					
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
					expandedIcon: 'pi pi-folder-open',
					collapsedIcon: 'pi pi-folder',
					expanded: true,
					children: this.treeData[i].children
				})
			} else {
				this.treeNode.push({
					label: this.treeData[i].label,
					expandedIcon: 'pi pi-folder-open',
					collapsedIcon: 'pi pi-folder',
					expanded: false,
					children: this.treeData[i].children

				})
			}
		}
	}

	nodeSelect(event:any) {
		this.url = event.node.data;
	}
	
	enrolCourse(){
		this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		if(this.currentSession.loggedUser == null) {
			this.showDialog = true;
			this.dialogValue = 'Please register/ login first';
			return;
		} else if (this.currentSession.loggedUser != null) {
			this.dialogValue = 'You are already enrolled for this course';
			this.showDialog = true;
		}
		
		this.contentService.addContentForStudent(this.currentSession.loggedUser, this.currentSession.contentId)
			.subscribe (data => {
				this.insertSuccess = data;
				console.log();
			})
	}
}
