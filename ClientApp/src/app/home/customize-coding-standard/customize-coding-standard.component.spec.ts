import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeCodingStandardComponent } from './customize-coding-standard.component';

describe('CustomizeCodingStandardComponent', () => {
  let component: CustomizeCodingStandardComponent;
  let fixture: ComponentFixture<CustomizeCodingStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeCodingStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeCodingStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
