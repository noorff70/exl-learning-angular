import { Component, OnInit } from '@angular/core';
import { ContentsearchService } from 'src/app/services/contentsearch/contentsearch.service';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchContent: string;
  contents: any;
  currentSession: UserSession;
  rows: number;

  constructor(
	private contentSearchService: ContentsearchService,
	private comService: CommunicationService
  ) { }

  ngOnInit() {
    this.comService.userSession.subscribe(session => {
      this.currentSession = session;
      this.retrieveFromLocalStorage()
   
    })
  }

  retrieveFromLocalStorage() {
    this.currentSession = JSON.parse(localStorage.getItem('usersession'));
    this.contents = this.currentSession.searchItem;
    if (this.contents !== undefined) {
      this.rows = this.contents.length / 3;
      if (this.rows % 3 > 0) {
			this.rows++;
		  }
    }
    
  }


  selectContent(contentId: any) {
	  this.currentSession = new UserSession();
	  this.currentSession.contentId = contentId;
	  this.currentSession.nextScreen = '<app-lesson>';
	  localStorage.setItem('usersession', JSON.stringify(this.currentSession));
	  this.comService.changeScreen(this.currentSession);
  } 
}