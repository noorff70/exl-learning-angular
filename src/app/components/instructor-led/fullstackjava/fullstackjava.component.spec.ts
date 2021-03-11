import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstackjavaComponent } from './fullstackjava.component';

describe('FullstackjavaComponent', () => {
  let component: FullstackjavaComponent;
  let fixture: ComponentFixture<FullstackjavaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullstackjavaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullstackjavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
