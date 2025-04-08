import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentSummaryComponent } from './instrument-summary.component';

describe('InstrumentSummaryComponent', () => {
  let component: InstrumentSummaryComponent;
  let fixture: ComponentFixture<InstrumentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
