import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationCheckoutComponent } from './quotation-checkout.component';

describe('QuotationCheckoutComponent', () => {
  let component: QuotationCheckoutComponent;
  let fixture: ComponentFixture<QuotationCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
