import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDropdownComponent } from './activity-dropdown.component';

describe('ActivityDropdownComponent', () => {
  let component: ActivityDropdownComponent;
  let fixture: ComponentFixture<ActivityDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
