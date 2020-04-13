import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavCardComponent } from './profile-nav-card.component';

describe('ProfileNavCardComponent', () => {
  let component: ProfileNavCardComponent;
  let fixture: ComponentFixture<ProfileNavCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNavCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
