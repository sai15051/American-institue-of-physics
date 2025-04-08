import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSummaryComponent } from './material-summary.component';

describe('MaterialSummaryComponent', () => {
  let component: MaterialSummaryComponent;
  let fixture: ComponentFixture<MaterialSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
