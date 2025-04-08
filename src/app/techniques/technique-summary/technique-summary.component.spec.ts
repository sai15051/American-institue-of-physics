import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniqueSummaryComponent } from './technique-summary.component';

describe('TechniqueSummaryComponent', () => {
  let component: TechniqueSummaryComponent;
  let fixture: ComponentFixture<TechniqueSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechniqueSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechniqueSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
