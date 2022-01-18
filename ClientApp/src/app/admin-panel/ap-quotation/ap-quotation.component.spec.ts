import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApQuotationComponent } from './ap-quotation.component';

describe('ApQuotationComponent', () => {
  let component: ApQuotationComponent;
  let fixture: ComponentFixture<ApQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
