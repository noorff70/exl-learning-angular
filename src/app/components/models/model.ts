export class Topic {
	topicId: number;
  	topicName: string;
  	topicDesc: string;
}

export class Contents {
	contentId: number;
	contentName: string;
	contentDesc: string;
	tutorId: number;
	topicId: number;
}

export class Lesson {
	_id: number;
	lessonTitle: string;
	lessonAuthor: string;
	lessonMission: LessonMission[];
	lessonContent: LessonContent[];
}

export class LessonMission {
	id: number;
	description: string;
}

export class LessonContent {
	lessonTitle: string;
	subTitle: LessonSubTitle[];
}

export class LessonSubTitle {
	name: string;
	lessonLink: string;
	lessonType: string;
}

export class Student {
	studentId: number;
	studentFName: string;
	studentLName: string;
	password: string;
	studentEmail: string;
	userName: string;
}

export class Tutor {
	tutorId: number;
	tutorFName: string;
	tutorLName: string;
	tutorAddress: string;
}

export class UserSession {
	currentScreen: string;
	nextScreen: string;
	contentId: any;
	searchItem: any;
	loggedUser: string;
	enrolledContents: any;
}

export class TreeData {
	label: string;
	data: string;
	expandedIcon: string;
    collapsedIcon: string;
	children: Children[];
	expanded: boolean;
}

export class Children {
	label: string;
	data : string;
	expandedIcon: string;
    collapsedIcon: string;
	expanded:boolean;
	icon: string;
}