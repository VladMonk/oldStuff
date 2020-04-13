import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWidgetComponent } from './company-widget.component';

describe('CompanyWidgetComponent', () => {
  let component: CompanyWidgetComponent;
  let fixture: ComponentFixture<CompanyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
