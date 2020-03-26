import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { ParentComponent } from './components/parent/parent.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { LessonComponent } from './components/lesson/lesson.component';


@NgModule({
  declarations: [
	AppComponent,
	HomeComponent,
	HeaderComponent,
	FooterComponent,
	LoginComponent,
	LessonComponent,
	LeftnavComponent,
	ParentComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	BrowserAnimationsModule,
	MatVideoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
