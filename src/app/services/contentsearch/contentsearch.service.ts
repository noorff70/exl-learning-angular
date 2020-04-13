import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ContentsearchService {

	//private REST_API_SERVER = 'http://localhost:8080/exl-learning-1';
	private REST_API_SERVER = 'http://localhost:8080';

	constructor(private http: HttpClient) { }

	getContentList(contentDesc: any) {
		return this.http.post(this.REST_API_SERVER + `/getContentListByContentDesc`, contentDesc)
			.pipe(catchError(this.handleError));
	}

	getLessonByContentId(id: any) {
		return this.http.get(this.REST_API_SERVER + `/getLessonByContentId`, {
			params: {
				CONTENTID: id
			}
		})
			.pipe(catchError(this.handleError));
	}

	getVideoByPath(path: any) {
		return this.http.get(this.REST_API_SERVER + `/getVideoByPath`, {
			params: {
				PATH: path
			}
		})
			.pipe(catchError(this.handleError));
	}

	registerNewUser(student: any) {
		return this.http.post(this.REST_API_SERVER + `/registerNewUser`, student)
			.pipe(catchError(this.handleError));
	}
	
	userLogin(student: any) {
		return this.http.post(this.REST_API_SERVER + `/userLogin`, student)
			.pipe(catchError(this.handleError));
	}
	
	addContentForStudent(userName: string, contentId: any) {
		return this.http.get(this.REST_API_SERVER + `/insertContentforLoggedStudent`, {
			params: {
				USERNAME: userName,
				CONTENTID: contentId
			}
		})
			.pipe(catchError(this.handleError));
	}


	handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		console.log('Error from Error Handler');
		if (error.error instanceof ErrorEvent) {
			// Client-side errors
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Server-side errors
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
	}



}
