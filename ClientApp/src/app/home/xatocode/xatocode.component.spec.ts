import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XatocodeComponent } from './xatocode.component';

describe('XatocodeComponent', () => {
  let component: XatocodeComponent;
  let fixture: ComponentFixture<XatocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XatocodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XatocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
