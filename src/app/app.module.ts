import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ParentComponent } from './components/parent/parent.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { LessonComponent } from './components/lesson/lesson.component';

import {TreeModule} from 'primeng/tree';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EnrolcourseComponent } from './components/enrolcourse/enrolcourse.component';
import { FullstackjavaComponent } from './components/instructor-led/fullstackjava/fullstackjava.component';
import { WebcourseComponent } from './components/instructor-led/webcourse/webcourse.component';

@NgModule({
  declarations: [
	AppComponent,
	HomeComponent,
	HeaderComponent,
	FooterComponent,
	LoginComponent,
	LessonComponent,
	ParentComponent,
	RegisterComponent,
	AboutComponent,
	EnrolcourseComponent,
	FullstackjavaComponent,
	WebcourseComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	BrowserAnimationsModule,
	MatVideoModule,
	TreeModule,
	PanelModule,
	DialogModule,
	FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
