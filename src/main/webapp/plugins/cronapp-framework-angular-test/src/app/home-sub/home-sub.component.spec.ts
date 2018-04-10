import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSubComponent } from './home-sub.component';

describe('HomeSubComponent', () => {
  let component: HomeSubComponent;
  let fixture: ComponentFixture<HomeSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
